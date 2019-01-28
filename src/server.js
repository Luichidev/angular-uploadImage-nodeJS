const express = require('express');
const multer = require('multer');
const path = require('path');


// Initializations
const app = express();

//settings
app.set('port', process.env.PORT || 3000)

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'assets/uploads'),
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const upload = multer({
  storage,
  dest: path.join(__dirname, 'assets/uploads'),
  limits: { fileSize: 2000000},  //2mb de limite
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|JPG/
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))

    if (mimetype && extname) return cb(null, true)

    cb("Error: Archivo debe ser una imagen valida")
  }
}).single('image')

app.post('/upload', upload, (req, res) => {
  console.log(req.file)
  res.send('Uploaded')
})


app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
