const fs = require('fs')
const path = require('path')
function isFile(path){
    return fs.lstatSync(path).isFile()
}
function isDirectory(path){
    return fs.lstatSync(path).isDirectory()
}
function callback(file, regex, arr) {
    let ext = path.extname(file)
    if(regex.test(ext)){
        console.log(file)
        arr.push(file)
    }
}
module.exports = function walk(dir, regex){
    var files = fs.readdirSync(dir);
    var fileArr = []
    files.forEach(v=>{
        if(!v.startsWith('.')){
            let tmp = path.join(dir, v);
            if(isFile(tmp)){
                callback(tmp, regex, fileArr)
            }else if(isDirectory(tmp)){
                walk(tmp)
            }
        }
    })
    // console.log(fileArr)
    return fileArr
}