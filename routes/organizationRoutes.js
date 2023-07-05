// routes/organizationRoutes.js
const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");

// Define the API route for creating a new organization
router.post('/postMessage', upload, organizationController.createOrganization);
// router.post("/basic", organizationController.basic);
router.get('/data',organizationController.idealJSON);

module.exports = router;
