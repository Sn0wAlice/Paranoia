export class createPartition {
    async createMB(size:number, name:string){
        await this.main(size*1024, name)
    }
    async createGB(size:number, name:string){
        await this.main(size*1024*1024, name)
    }

    private async main(size:number, name:string){
        //execute dd command
        Deno.mkdirSync("./out", { recursive: true })
        const p = await Deno.run({
            cmd: ["dd", "if=/dev/zero", "of=./out/"+name, "bs="+size, "count=1024"],
            stdout: "piped",
            stderr: "piped"
        })
        await p.status()
        console.log("Partition created: ./out/"+name)
        return 
    }

}