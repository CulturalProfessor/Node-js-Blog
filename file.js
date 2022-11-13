const fs=require('fs');

//read files
// fs.readFile("./read.txt", (err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// })
// console.log('last line');

//Write files
// fs.writeFile("./read.txt", "Bye world",()=>{
//     console.log('file was written');
// })

//writing directories
if(!fs.existsSync('./assets')){
fs.mkdir("./assets", (err)=>{
    if(err){
        console.log(err);
    }
     console.log('folder created');
})}else{
    fs.rmdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('removed folder');
    })
}
//deleting files
if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}