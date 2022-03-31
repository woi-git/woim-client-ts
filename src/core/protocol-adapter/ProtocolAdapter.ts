import { Payload } from "../obj/Payload";

export interface ProtocolAdapter{
  parse(data:any):Payload
}