export class zip {
    //zip partition with Paranoia Optimization
    zip(path: string) {
        let p = Deno.readFileSync(path);
        //Try to create a zip format of the partition
        let z = (p.toString()).split(",")
        //need to check when same number of bytes are in the array more than 2 times
        let z2:string[] = []
        let prec = ""
        let count = 0
        for(let i = 0; i < z.length; i++){
            if(z[i] == prec && i < z.length - 1){
                count++
            } else {
                // push the previous number
                if(count > 1){
                    count++
                    z2.push(`${count}.${prec}`)
                } else {
                    if(i > 0){
                        if(count == 1){
                            z2.push(z[i-1])
                        }
                        z2.push(z[i-1]) 
                    }
                }
                count = 0
            }
            prec = z[i]
            if(i == z.length - 1){
                z2.push(z[i])
            }
        }
        //z2 contain the array of optimized partition
        return z2
    }

    unzip(path:string) {
        let zipped = Deno.readTextFileSync(path);
        //Rebuild the partition
        let newPart:any[] = []
        for(let i = 0; i < zipped.length; i++){
            if(zipped[i].includes(".")){
                let num = Number(zipped[i].split(".")[0])
                for(let j = 0; j < num; j++){
                    newPart.push(zipped[i].split(".")[1])
                }
            } else {
                newPart.push(zipped[i])
            }
        }
        //new buffer from array
        return new Uint8Array(newPart)
    }
}