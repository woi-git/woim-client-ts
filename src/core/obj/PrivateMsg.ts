import { MsgCst } from "../constant/msg-cst"

export class PrivateMsg {
  srcUid:string
  destUid:string
  type:number
  content:string
  timestamp:number
  constructor(srcUid='',destUid='',type=MsgCst.type.TEXT,content='',timestamp=(new Date).getTime()){
    this.srcUid=srcUid
    this.destUid=destUid
    this.type=type
    this.content=content
    this.timestamp=timestamp
  }
}