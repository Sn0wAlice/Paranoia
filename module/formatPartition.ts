const format = [
   "bfs",
   "cramfs",
   "ext2",
   "ext3",
   "ext4",
   "ext4dev",
   "fat",
   "minix",
   "msdos",
   "ntfs",
   "vfat"
]

export class formatPartition {
    async formatPartition(path: string, formatAsk:string) {
        //check format is available
        if (format.indexOf(formatAsk) == -1) {
            return false
        } else {
            await this.format(path, formatAsk)
            return true
        }
    }

    getAvailablePartition() {
        return format;
    }

    private async format(path:string, format:string){
        const p = await Deno.run({
            cmd: ["mkfs."+format, path],
            stdout: "piped",
            stderr: "piped"
        })
        await p.status()
        return
    }
}