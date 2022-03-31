import { JPayload } from "../obj/JPayload";
import { Payload } from "../obj/Payload";
const encoder = new TextEncoder()
const decoder = new TextDecoder()



const str2Bytes=function(str:string){
  return encoder.encode(str)
}

const bytes2Str=function(bytes:number[]){
  return decoder.decode(Uint8Array.from(bytes))
}

const P2Jp=function(payload:Payload){
  const jPayload = new JPayload()
  jPayload.sn=payload.sn
  jPayload.cmd=payload.cmd
  jPayload.type=payload.type
  jPayload.responseRequired=payload.responseRequired
  jPayload.dcn=Array.from(str2Bytes(payload.dcn))
  jPayload.data=Array.from(str2Bytes(JSON.stringify(payload.data)));
  return jPayload;
}

const JP2P=function(jPayload:JPayload){
  const payload = new Payload(JSON.parse(bytes2Str(jPayload.dcn)),JSON.parse(bytes2Str(jPayload.data)))
  payload.sn=jPayload.sn
  payload.cmd=jPayload.cmd
  payload.type=jPayload.type
  payload.responseRequired=jPayload.responseRequired
  return payload;
}

export{P2Jp,JP2P,str2Bytes,bytes2Str}

