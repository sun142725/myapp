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
        arr.push(file)
    }
}
```bash
dir   路径(C:\Users\user\Desktop)
regex  正则
```
* 图片 /.jpg|.png|.gif|.jpeg/i
* 音乐 /.mp3/i
module.exports = function walk(dir, regex){
    var files = fs.readdirSync(dir);
    var fileArr = []
    files.forEach(v=>{
        if(!v.startsWith('.')){
            let tmp = path.join(dir);
            if(isFile(tmp)){
                callback(tmp, regex)
            }else if(isDirectory(tmp)){
                walk(tmp)
            }
        }
    })
    return fileArr
}