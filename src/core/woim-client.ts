import { PayloadCst } from "./constant/payload-cst"
import { PayloadHandler } from "./handler/PayloadHandler"
import { Payload } from "./obj/Payload"
import { DefaultAdapter } from "./protocol-adapter/DefaultAdapter"
import { ProtocolAdapter } from "./protocol-adapter/ProtocolAdapter"
import { P2Jp } from "./util/payload-util"


export class WOIMClient {
  private host: string
  private port: number
  private path: string
  private socket: WebSocket | undefined
  private responseHandlers: Map<number, (payload:Payload) => boolean>
  adapter:ProtocolAdapter
  handlers:PayloadHandler[]
  config: {
    requestExpiration: number
    heartbeatInterval:number
  }
  onopen?: ((this: WOIMClient, ev: Event) => any) 
  onclose?: ((this: WOIMClient, ev: CloseEvent) => any) 
  onerror?: ((this: WOIMClient, ev: Event) => any) 



  constructor(host: string, port: number, path: string, adapter:ProtocolAdapter=new DefaultAdapter(),config = {
    requestExpiration: 5000,
    heartbeatInterval:3600*1000,
  },onopen?: ((this: WOIMClient, ev: Event) => any),
  onclose?: ((this: WOIMClient, ev: CloseEvent) => any),
  onerror?: ((this: WOIMClient, ev: Event) => any)) {
    this.host = host
    this.port = port
    this.path = path
    this.adapter=adapter
    this.config = config
    this.responseHandlers=new Map()
    this.handlers=[]
    this.onopen=onopen
    this.onclose=onclose
    this.onerror=onerror
  }

  connect() {
    if (this.socket) {
      this.socket.close()
    }
    this.socket = new WebSocket('ws://' + this.host + ':' + this.port + this.path)
    this.socket.onopen = e=>{
      if(this.onopen){
        this.onopen(e)
      }
    }
    this.socket.onclose = e=>{
      if(this.onclose){
        this.onclose(e)
      }
    }
    this.socket.onmessage = e => {
      const payload =  this.adapter.parse(e.data)
      if(payload.type===PayloadCst.type.RESPONSE){
        const handleResponse =  this.responseHandlers.get(payload.respondSn)
        this.responseHandlers.delete(payload.respondSn)
        if(handleResponse){
          if(handleResponse(payload)){
            return
          }
        }
      }
      for(let i=0;i<this.handlers.length;++i){
        if(this.handlers[i].pass(payload)){
          break;
        }
      }
    }
    this.socket.onerror = e=>{
      if(this.onerror){
        this.onerror(e)
      }
    }
  }

  close() {
    this.checkSocket()
    this.socket!.close()
  }

  auth(token:any, dcn: string, handleResponse?: (payload:Payload) => boolean , handleTimeout?: () => void ) {
    this.checkSocket()
    this.push(token,dcn,PayloadCst.cmd.AUTH, true,handleResponse,handleTimeout)
  }

  checkSocket() {
    if (!this.socket) {
      throw new Error("client is uninitialized")
    }
  }

  checkSocketState() {
    this.checkSocket()
    if (this.socket!.readyState != WebSocket.OPEN) {
      throw new Error("socket is not open")
    }
  }

  getState() {
    this.checkSocket()
    return this.socket!.readyState
  }

  push(data: any, dcn: string,cmd:string=PayloadCst.cmd.REQUEST, responseRequired: boolean = true, handleResponse?: (payload:Payload) => boolean , handleTimeout?: () => void) {
    this.checkSocketState()
    const payload = new Payload(dcn, data,new Date().getTime(),cmd,PayloadCst.type.REQUEST,responseRequired)
    const jp = P2Jp(payload)
    if (jp.responseRequired) {
      if (handleResponse) {
        this.responseHandlers.set(jp.sn, handleResponse)
      }
      setTimeout(() => {
        if (this.responseHandlers.delete(jp.sn)) {
          if (handleTimeout) {
            handleTimeout()
          }
        }
      }, this.config.requestExpiration);
    }

    this.socket!.send(JSON.stringify(jp))
  }

}





