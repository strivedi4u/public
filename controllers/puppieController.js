const Puppie = require("../models/Puppie");
const fs = require('fs');
const { validationResult } = require(`express-validator`);


const puppie_all = async (req, res) => {
    try {
        const puppies = await Puppie.find();
        res.json(puppies);
    } catch (error) {
        res.json({ message: error });
    }
};

const puppie_details = async (req, res) => {
    try {
        const puppie = await Puppie.findById(req.params.puppieId);
        res.json(puppie);
    } catch (error) {
        res.json({ message: error });
    }
};

const puppie_create = async (req, res) => {
    // const formData = req.files;
    console.log("YES");
    console.log(req.body);
    const parseObject = JSON.parse(req.body.model);
    console.log(parseObject);
    let success = false;
    const errors = validationResult(parseObject);
    var ok = validationResult(req.body.model);
    console.log(ok);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //check whether the Puppie with same name exists already
    let puppieCheck = await Puppie.findOne({ name: parseObject.name });
    if (puppieCheck) {
        return res.status(400).json({ success, error: "Sorry a Puppie with this name already exists" });
    }

    const puppie = Puppie.create(
        {
            name: parseObject.name,
            color: parseObject.color,
            birthday: parseObject.birthday,
            weight: parseObject.weight,
            breed: parseObject.breed,
            gender: parseObject.gender,
            amount: parseObject.amount,
            status: parseObject.status,
            about: parseObject.about,
            video1: parseObject.video1,
            video2: parseObject.video2,
            image1: "files1-" + parseObject.name + ".jpg",
            image2: "files2-" + parseObject.name + ".jpg",
            image3: "files3-" + parseObject.name + ".jpg",
            image4: "files4-" + parseObject.name + ".jpg",
            image5: "files5-" + parseObject.name + ".jpg"
        }
    ).then(
        res.json("Details have been Successfully Saved")
    )
        .catch(err => {
            console.log(err);
            return res.status(500).json({ success, error: "Internal Server Error" });
        }
        );
    console.log("Done");
};



// function puppie_create(req, res) {
//     console.log(req.body)
//     const parseObject = JSON.parse(req.body.hi);
//     console.log(parseObject);
//     const employeeName = req.body.employeeName;
//     const files = req.files;

//     console.log(`Employee name: ${employeeName}`);
//     console.log(`Uploaded files:`);
//     files.forEach((file) => {
//       console.log(file.filename);
//     });

//     employeeModel.add(employeeName);

//     res.json({ message: 'Files uploaded successfully' });
//   }



const puppie_update = async (req, res) => {
    const parseObject = JSON.parse(req.body.model);
    console.log(parseObject);
    try {
        const filter = { name: req.params.name };
        const update = {
            name: parseObject.name,
            color: parseObject.color,
            birthday: parseObject.birthday,
            weight: parseObject.weight,
            breed: parseObject.breed,
            gender: parseObject.gender,
            amount: parseObject.amount,
            status: parseObject.status,
            about: parseObject.about,
            video1: parseObject.video1,
            video2: parseObject.video2,
        };
        const puppie = await Puppie.findOne(filter);
        if (puppie) {
            Object.assign(puppie, update);
            await puppie.save();
            res.json("Details have been Successfully Saved")
        } else {
            return res.status(400).json({ success, errors: errors.array() });
        }
    } catch (error) {
        res.json({ message: error });
    }
    console.log("Done");
};




const puppie_delete = async (req, res) => {
    console.log(req.params.name);
    const puppie = await Puppie.find({ name: req.params.name }, { image1: 1, image2: 1, image3: 1, image4: 1, image5: 1 });
    console.log(puppie);
    try {
        fs.unlink('./uploads/' + puppie[0].image1, function (err) {
            if (err) {
                throw err;
            }
            console.log('File deleted!');
        })

        fs.unlink('./uploads/' + puppie[0].image2, function (err) {
            if (err) {
                throw err;
            }
            console.log('File deleted!');
        })

        fs.unlink('./uploads/' + puppie[0].image3, function (err) {
            if (err) {
                throw err;
            }
            console.log('File deleted!');
        })

        fs.unlink('./uploads/' + puppie[0].image4, function (err) {
            if (err) {
                throw err;
            }
            console.log('File deleted!');
        })

        fs.unlink('./uploads/' + puppie[0].image5, function (err) {
            if (err) {
                throw err;
            }
            console.log('File deleted!');
        })
    }
    catch (error) {
        console.log("Error in files")
    }
    try {
        const filter = { name: req.params.name };
        const deletedPuppie = await Puppie.findOneAndDelete(filter);
        res.json(deletedPuppie);
    } catch (error) {
        res.json({ message: error });
    }
};













const puppie_gender = async (req, res) => {
    try {
        const puppies = await Puppie.find({ gender: req.params.gender });
        res.json(puppies);
    } catch (error) {
        res.json({ message: error });
    }
};




const puppie_findByName = async (req, res) => {
    try {
        const puppies = await Puppie.find({ name: req.params.name });
        res.json(puppies);
    } catch (error) {
        res.json({ message: error });
    }
};


const puppie_status = async (req, res) => {
    try {
        const puppies = await Puppie.find({ status: req.params.status });
        res.json(puppies);
    } catch (error) {
        res.json({ message: error });
    }
};

const puppie_breed = async (req, res) => {
    try {
        const puppies = await Puppie.find({ breed: req.params.breed });
        res.json(puppies);
    } catch (error) {
        res.json({ message: error });
    }
};






module.exports = {
    puppie_all,
    puppie_details,
    puppie_create,
    puppie_update,
    puppie_delete,

    puppie_gender,
    puppie_findByName,
    puppie_status,
    puppie_breed
}