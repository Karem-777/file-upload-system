const fs = require("fs");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname, "../filestorage"))
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: function(req,file,cd){
        if(file.mimetype.endsWith("pdf")){
            cd(null,true);
        } else{
            cd(new Error("Only PDF files are allowed"), false);
        }
    }

}).single("myfile")

exports.uploadFile = (req, res, next) => {
    upload(req,res,function(err){
        if(err){
            res.send(err)
        } else{
            res.redirect("/api/file/retrieveFiles");
        }
    }
)}


exports.retrieveFiles = (req, res, next) => {
    const storagePath = path.join(__dirname, "../filestorage");

    fs.readdir(storagePath, (err, files) => {
        if (err) {
            return next(err);
        }

        res.render("index", {
            files: files
        });
    });
};

exports.deleteFile = (req, res, next) => {
    const filename = req.params.filename;

    const filePath = path.join(__dirname, "../filestorage", filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/api/file/retrieveFiles");
    });
};

exports.openFile = (req, res, next) => {
    const filename = req.params.filename;

    const filePath = path.join(
        __dirname,
        "../filestorage",
        filename
    );

    res.type("application/pdf");

        res.sendFile(filePath, (err) => {
            if (err) {
                next(err);
            }
        })
};
