# Paranoia 💊
![](./files/logo.png)

Ready to manipulate partitions file? Create a custom partition, apply custom security system, hide the partition and share your hidden data on the www 🌐

# How to use ?
You can use the command `-help` to show the help menu

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

# Authors: 
- [Alice Snow](https://github.com/Sn0wAlice)