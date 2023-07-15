// controllers/organizationController.js
//importing models
const Organization = require("../models/Organization");
const listOfOrg = require("../models/listOfOrg");
const images = require("../models/images");
//importing libraries
const fs = require("fs");

// Controller function for creating a new organization
exports.createOrganization = async (req, res) => {
  try {
    console.log("reuqest body", req.body);
    const { name, surname, organization, organization2, organization3, organization4, organization5, role, role2, role3, role4, role5, url } =
      req.body;
    const image = req.file.filename;
    const imageName = {name: req.file.filename, image: fs.readFileSync(req.file.path)};
    // console.log(imageName);
    const final_org = [organization, organization2, organization3, organization4, organization5].filter((curr) => curr !== undefined);
    const final_role = [role, role2, role3, role4, role5].filter((curr) => curr !== undefined);

    if (name === "" || surname === "" || final_org.length === 0 || final_role.length === 0 || url === "") {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    // console.log("array of organisation entered", final_org);

    const orgData = {
      member: `${name} ${surname}`,
      name : `${name.split('')[0]}${surname.split('')[0]}`,
      organization: final_org,
      role: final_role,
      img: '../img/male_user.png',
      link: url,
      size: 50000,
    };

    console.log("Object that will go to DB", orgData);

    // Create a new organization document
    const organizationObj = new Organization(orgData);
    const imgaeNameObj = new images(imageName);

    for (const now of final_org) {
      const temp = await listOfOrg.findOne({ name: now });
      if (temp === null) {
        const OrgObj = new listOfOrg({ name: now, img: "" });
        await OrgObj.save();
      } else {
        console.log(`This Organisation already exists: ${now}`);
      }
    }

    // Save the organization to MongoDB
    await organizationObj.save();
    // await imgaeNameObj.save();
    fs.unlinkSync(req.file.path);
    res.status(201).json({ message: "Organization created successfully" });
  } catch (error) {
    // console.error(error?.message)
    res.status(500).send(error);
    // res.status(500).json({ error: 'Failed to create organization' });
  }
};

exports.basic = async (req, res) => {
  try {
    const { self } = req.body;
    console.log(self);
    res.status(201).json({ message: "done!!!" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create basic" });
  }
};

exports.idealJSON = async (req, res) => {
  try {
    const data = await listOfOrg.find();
    console.log(data[0].name);
    const listOfAll = [];

    for (const d of data) {
      const query = { organization: { $in: [d.name] } };
      const matchingOrganizations = await Organization.find(query);

      const temparray = [];
      for (const curr of matchingOrganizations) {
        const org = { member: curr.member.split(' ')[0] + " " + curr.member.split(' ')[1],
        name: `${curr.member.split(' ')[0].split("")[0]}${curr.member.split(' ')[1].split("")[0]}`, link: curr.link, img: curr.img, size: curr.size};
        temparray.push(org);
      }

      const eachOrg = { name: d.name, img: d.img, children: [...temparray] };
      listOfAll.push(eachOrg);
      console.log("this is from the loop", listOfAll[0]);
    }

    const idealData = { name: "UoB", children: [...listOfAll] };
    console.log("this outside the loop", listOfAll[1]);
    res.status(200).json(idealData);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.images = async (req,res) => {
  try{
    const imageData = await images.find();
    const array = [];
    for(const t of imageData){
      array.push({name:t.name,image: t.image});
    }
    res.status(200).json(array);
  }catch(e){res.status(400).json({message:e})}
};