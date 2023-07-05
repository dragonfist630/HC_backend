
const express = require('express');
const multer = require('multer');

const app = express();

// Set up Multer for handling file uploads
const upload = multer({
  dest: 'Images/' // Specify the directory where uploaded files will be stored
});

// // Handle JSON data
app.use(express.json());

// Handle form data with file uploads
app.post('/upload', upload.single('image'), async (req, res) => {
  // Access JSON data
  const jsonData = req?.body?.data;

  // Access uploaded file
  const imageFile = req.file;

  // Process the data and image as needed

  console.log(jsonData);
  console.log(imageFile)

  res.send(JSON.stringify(jsonData));
});

app.listen(3000, ()=>{

    console.log("app is listening at port 3000")
})