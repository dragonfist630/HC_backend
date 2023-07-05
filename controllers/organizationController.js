// controllers/organizationController.js
const Organization = require("../models/Organization");
const listOfOrg = require("../models/listOfOrg");

// Controller function for creating a new organization
exports.createOrganization = async (req, res) => {
  try {
    console.log("reuqest body", req.body);
    const { name, surname, organization, organization2, organization3, organization4, organization5, role, role2, role3, role4, role5, url } =
      req.body;
    const image = req.file.filename;

    const final_org = [organization, organization2, organization3, organization4, organization5].filter((curr) => curr !== undefined);
    const final_role = [role, role2, role3, role4, role5].filter((curr) => curr !== undefined);

    if (name === "" || surname === "" || final_org.length === 0 || final_role.length === 0 || url === "") {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    console.log("array of organisation entered", final_org);

    const orgData = {
      name,
      surname,
      organization: final_org,
      role: final_role,
      image,
      url,
    };

    console.log("Object that will go to DB", orgData);

    // Create a new organization document
    const organizationObj = new Organization(orgData);

    for (const now of final_org) {
      const temp = await listOfOrg.findOne({ name: now });
      if (temp === null) {
        const OrgObj = new listOfOrg({ name: now });
        await OrgObj.save();
      } else {
        console.log(`This Organisation already exists: ${now}`);
      }
    }

    // Save the organization to MongoDB
    await organizationObj.save();

    res.status(201).json({ message: "Organization created successfully" });

    // ------------------------------------------------------
    // console.log(req.body,req.form);
    // console.log("reuqest body", req.body);
    // const { name, surname, organization, organization2, organization3, organization4, organization5, role, role2, role3, role4, role5, url } =
    //   req.body;
    // const image = req.file.filename;
    // // console.log(req.file.filename);
    // // console.log("request file",req.file)
    // const final_org = [];
    // const final_role = [];
    // [organization, organization2, organization3, organization4, organization5].map((curr, i) => {
    //   if (curr != null) {
    //     final_org.push(curr);
    //   }
    // });
    // [role, role2, role3, role4, role5].map((curr) => {
    //   if (curr != null) {
    //     final_role.push(curr);
    //   }
    // });
    // if (name === "" || surname === "" || final_org === [] || final_role === [] || url === "") {
    //   res.status(400).json({ message: "Fill all the fields" });
    // }
    // console.log("array of organisation entered", final_org);
    // const orgData = {
    //   name,
    //   surname,
    //   organization: final_org,
    //   role: final_role,
    //   image,
    //   url,
    // };
    // console.log("Object that will got to DB", orgData);
    // var Org = null;
    // // console.log(JSON.stringify(orgData))

    // // Create a new organization document
    // const organizationObj = new Organization(orgData);
    // final_org.map(async (now, i) => {
    //   // console.log(`this is the ${i}`,now);
    //   const temp = await listOfOrg.findOne({ name: now });
    //   if (temp === null) {
    //     Org = { name: now };
    //     const OrgObj = new listOfOrg(Org);
    //     await OrgObj.save();
    //   } else {
    //     console.log(`This Organisation already exists : ${now}`);
    //   }
    // });
    // // Save the organization to MongoDB
    // await organizationObj.save();

    // res.status(201).json({ message: "Organization created successfully" });
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
        const org = { name: curr.name + " " + curr.surname, img: curr.image, url: curr.url };
        temparray.push(org);
      }

      const eachOrg = { name: d.name, img: "", children: [...temparray] };
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
