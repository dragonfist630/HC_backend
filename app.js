// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());

//dotenv config
require('dotenv').config();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;


// Connect to MongoDB
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));

// Parse request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

// Load routes
const organizationRoutes = require('./routes/organizationRoutes');
app.use('/', organizationRoutes);

// app.post('/printMessage',(req,res)=>{
//   console.log(req.body);
//   res.send(req.body)
// });

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
