function sendHtml (urlPath, file) {
    console.log(urlPath)
    app.get('/' + urlPath, function(req, res) {
        res.header("Content-Type", "text/html");
        res.sendFile(path.join(__dirname, urlPath))
    })
}
function isFile (path) {
    return fs.lstatSync(path).isFile()
}
function isDirectory (path) {
    return fs.lstatSync(path).isDirectory(path)
}
function getHtml (dir){
    var files = fs.readdirSync(dir);
    var reg = /.html/i;
    files.forEach(v=>{
        if(!v.startsWith('.')){
            console.log(v)
            let tmp = path.join(dir,v);
            if(isFile(tmp) && reg.test(v)){
                console.log(v, tmp)
                sendHtml(tmp, v)
            } else if (isDirectory(tmp)){
                getHtml(tmp)
            }
        }
    })
}
 module.exports = {
    getHtml,
    isDirectory,
    isFile,
    sendHtml
 }