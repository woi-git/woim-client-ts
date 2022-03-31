# WOIMClient-ts

#### Introduction

**WOIMClient-ts** is a sdk for web frontend.

**WOIM** repositories:
[github](https://github.com/woi-git/woim)
[gitee](https://gitee.com/woi/woim)

#### Quick Start

- **Download the SDK**
  
  <img src="https://gitee.com/woi/res/raw/main/woim/screenshot/web_client/ts/download_step.png" alt="image" height=500px />

- **Import WOIMClient in your project**
  
  ```typescript
  import { WOIMClient } from "../woim-client-ts/src/core/woim-client";
  ```

- **Use apis**
  
  - **Instantiate WOIMClient**
    
    ```typescript
    client = new WOIMClient("localhost", 8336, "/ws")
    ```
  
  - **Configure your client**
    
    ```typescript
    //try to authorize your channel after opening
    client.onopen = (e) => {
      client.auth(
        token,
        dcn,
        (payload: any) => {
          console.log(payload);
          return true;
        },
        () => console.log("timeout")
      )
    }
    
    //configure handler to handle the msg from backend
    client.handlers.push(
      new PayloadHandler(JavaClassName.PrivateMsg, (payload) => {
        console.log(payload.data)
        return true
      })
    )
    ```
  
  - **Push data to backend**
    
    ```typescript
    const data = new PrivateMsg()
    data.srcUid='test'
    data.destUid='woi'
    data.content='hello'
    this.client.push(data,JavaClassName.PrivateMsg)
    ```

#### Screenshot

<img title="" src="https://gitee.com/woi/res/raw/main/woim/screenshot/web_client/ts/1.png" alt="image" width="670">

#### Contacts

Email：

woimail@163.com

woi.cmail@gmail.com
