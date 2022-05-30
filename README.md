# Paranoia 💊
![](./files/logo.png)

Ready to manipulate partitions file? Create a custom partition, apply custom security system, hide the partition and share your hidden data on the www 🌐

# How to use ?
1. install [Deno](https://deno.land) on your conputer
2. `git clone` this rep
3. Have fun with `deno run -A main.ts`
> You can use the arg `-help` to show the help menu

# Exemple
### Create new partion of 1Mb, format to ext3 and zip it
```
deno run -A main.ts -c 1 test.img -f ext3 -z test
```
then, the file `test.paranoia` will contain the zipped part
> notice that in this case, "name" argument for the format and zip is not required

### Just create a ext4 partition
```
deno run -A main.ts -c 1 test.img -f ext4
```

### Mount partition
Simple: `sudo mount [imgFile] [mountPoint]`
> Note that it is a root partition, use `chmod 755` to use it with no-root user

# Authors: 
- [Alice Snow](https://github.com/Sn0wAlice)