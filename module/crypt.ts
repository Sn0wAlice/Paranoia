import { AES } from "https://deno.land/x/god_crypto/aes.ts";

export class cryptManagement {
    
    async encrypt(text: string | Uint8Array, key: string) {
        let c = await new AES(this.updateKey(key), {
            mode: "cbc",
            iv: "aaaaaaaaaaaaaaaa"
        }).encrypt(text)
        return c
    }

    async decrypt(text: any, key: string) {
        //convert text hex to binary

        return await (new AES(this.updateKey(key), {
            mode: "cbc",
            iv: "aaaaaaaaaaaaaaaa"
        })).decrypt(text);
    }

    private updateKey(key:string){
        //key need to be updated to be 16, 24 or 32 bytes long
        if(key.length == 16 || key.length == 24 || key.length == 32){
            return key
        }
            
        if(key.length < 16){
            while(key.length < 16){
                key += "0";
            }
        } else if(key.length < 24){
            while(key.length < 24){
                key += "0";
            }
        } else if(key.length < 32){
            while(key.length < 32){
                key += "0";
            }
        } else {
            //key is too long, we need to cut it
            key = key.substring(0, 32);
        }
        return key
        
    }

}