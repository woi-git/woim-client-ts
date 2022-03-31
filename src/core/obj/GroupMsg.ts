import { MsgCst } from "../constant/msg-cst"

export class GroupMsg {
  srcUid:string
  groupId:number
  type:number
  content:string
  timestamp:number
  constructor(srcUid='',groupId=-1,type=MsgCst.type.TEXT,content='',timestamp=(new Date).getTime()){
    this.srcUid=srcUid
    this.groupId=groupId
    this.type=type
    this.content=content
    this.timestamp=timestamp
  }
}