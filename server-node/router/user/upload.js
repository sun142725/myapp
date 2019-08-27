var con = require('../../mysql')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/image');    
    },
    filename: function (req, file, cb) {
        cb(0, Date.now() + "-" + file.originalname);  
    }
});
var upload = multer({storage: storage})
module.exports = function (app, fn) {
    app.post('/uploadChatPic', upload.single('avatar'), function(req, res, next){
        console.log(req.file)
         res.status(200).json({
             code: 0,
             downurl: req.protocol + '://' + req.headers.host + '/images/' + req.file.filename,
             url: req.protocol + '://' + req.headers.host + '/public/upload/image/' + req.file.filename
         })
     })
     app.get('/images/*', function(req, res){
         const name = req.params['0']
         res.header("Content-Type", "image/*");
        res.sendFile(path.resolve(__dirname, '../../public/upload/image/' + name))
     })
}
