import { createPartition } from "./module/createPartition.ts";
const _createPartition = new createPartition();

import { formatPartition } from "./module/formatPartition.ts";
const _formatPartition = new formatPartition();

import { cryptManagement } from "./module/crypt.ts";
const _cryptManagement = new cryptManagement();

import { zip } from "./module/zip.ts";
const _zip = new zip();

///////////////:  INFOS  :///////////////
if(Deno.args.includes("-help")){
    console.log(Deno.readTextFileSync("./module/help.txt"));
    Deno.exit(0)
}


if(Deno.args.includes("-fShow")){
    console.log(`Available formats: ${_formatPartition.getAvailablePartition()}`)
    Deno.exit(0)
}


///////////////: EXECUTE :///////////////

let workingfile = ""

//Creating a partition
if(Deno.args.includes("-c")){
    //Create MB partition
    let index = Deno.args.indexOf("-c");
    let size = Number(Deno.args[index+1]);
    let name = Deno.args[index+2];

    if(size > 0 && name != undefined){
        console.log(`Creating ${size} MB partition named ${name}...`);
        await _createPartition.createMB(size, name);
        workingfile = `./out/${name}`
    } else {
        console.log(`Wrong arguments for -c : -c [size] [name]`);
        Deno.exit(1);
    }
}

//Formatting a partition
if(Deno.args.includes("-f")){
    //Formatting partition
    let index = Deno.args.indexOf("-f");
    let name = workingfile != "" ? workingfile : Deno.args[index+1];
    let type = workingfile != "" ? Deno.args[index+1] : Deno.args[index+2];

    if(name != undefined && type != undefined){
        console.log(`Formatting ${name} with ${type}...`);
        await _formatPartition.formatPartition(name, type);
    } else {
        console.log(`Wrong arguments for -f : -f [name] [type]`);
        Deno.exit(1);
    }
}

//Zipping a partition
if(Deno.args.includes("-z")){
    //Zipping partition
    let index = Deno.args.indexOf("-z");
    let name = workingfile != "" ? workingfile : Deno.args[index+1];
    let outName = workingfile != "" ? Deno.args[index+1] : Deno.args[index+2];

    if(name != undefined){
        console.log(`Zipping ${name}...`);
        let ziped = _zip.zip(name);
        Deno.writeTextFileSync("./out/"+outName+".paranoia", ziped.join(" "));
        console.log(`Zipped into out/${outName}.paranoia`);
    } else {
        console.log(`Wrong arguments for -z : -z [name]`);
        Deno.exit(1);
    }
}

//Unzipping a partition
if(Deno.args.includes("-uz")){
    //Unzipping partition
    let index = Deno.args.indexOf("-uz");
    let name = Deno.args[index+1];
    let outName = Deno.args[index+2];

    if(name != undefined){
        console.log(`Unzipping ${name}...`);
        let unziped = _zip.unzip(name);
        Deno.writeFileSync("./out/"+outName, unziped);
        console.log(`Unzipped into out/${name}`);
    } else {
        console.log(`Wrong arguments for -uz : -uz [name]`);
        Deno.exit(1);
    }
}

///////////////: ENCRYPTION :///////////////
if(Deno.args.includes("-lock")){
    let index = Deno.args.indexOf("-lock");
    let path = Deno.args[index+1];
    //ask for password
    let password = await getUserReponse("Password");
    //encrypt partition
    console.log(`Encrypting ${path}...`);
    let encrypted = await _cryptManagement.encrypt(Deno.readFileSync(path), password);
    Deno.writeFileSync(path+".lparanoia", encrypted);
    //delete original file
    Deno.removeSync(path);
    console.log(`Encrypted into ${path}.lparanoia`);
}

if(Deno.args.includes("-unlock")){
    let index = Deno.args.indexOf("-unlock");
    let path = Deno.args[index+1];
    //ask for password
    let password = await getUserReponse("Password");
    //decrypt partition
    console.log(`Decrypting ${path}...`);
    let decrypted = await _cryptManagement.decrypt(Deno.readFileSync(path), password);
    Deno.writeFileSync(path.replace(".lparanoia", ""), decrypted);
    //delete original file
    Deno.removeSync(path);
    console.log(`Decrypted into ${path.replace(".lparanoia", "")}`);
}

async function getUserReponse(text_input:string) {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(text_input + ": "));
    const n = <number>await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
}