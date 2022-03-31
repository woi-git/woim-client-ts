import { PayloadCst } from "../constant/payload-cst"

export class Payload {
  sn: number
  cmd: string
  type: number
  responseRequired: boolean
  respondSn: number
  dcn: string
  data: any
  constructor(dcn: string,
    data: any,
    sn: number=new Date().getTime(),
    cmd: string=PayloadCst.cmd.REQUEST,
    type: number=PayloadCst.type.REQUEST,
    responseRequired: boolean=true,
    respondSn: number=-1){
      this.sn=sn
      this.cmd=cmd
      this.type=type
      this.responseRequired=responseRequired
      this.respondSn=respondSn;
      this.dcn=dcn
      this.data=data
  }
}