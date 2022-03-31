import { Payload } from "../obj/Payload"

export class PayloadHandler{
  handleClass:string

  handle:(payload:Payload)=>boolean
  constructor(handleClass:string,handle:(payload:Payload)=>boolean){
    this.handleClass=handleClass
    this.handle=handle
  }

  pass(payload:Payload):boolean{
    if(payload.dcn===this.handleClass){
      if(this.handle){
        return this.handle(payload)
      }
    }
    return false
  }
  
}
