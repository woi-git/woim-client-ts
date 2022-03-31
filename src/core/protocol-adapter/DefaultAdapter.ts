import { Payload } from "../obj/Payload";
import { ProtocolAdapter } from "./ProtocolAdapter";

export class DefaultAdapter implements ProtocolAdapter{
  parse(data: any): Payload {
    const res =  JSON.parse(data)
    res.dcn = res.dcn?atob(res.dcn):null
    res.data = res.data?JSON.parse(atob(res.data)):null
    return res
  }
  
}