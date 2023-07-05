// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://dragonfist630:Password%40123@cluster0.rly5r.mongodb.net/ballot?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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
