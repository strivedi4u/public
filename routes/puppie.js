const router = require("express").Router();
const Puppie = require("../models/Puppie");
const multer = require("multer");
const puppieController = require('../controllers/puppieController');
const verify = require(`../middlewares/login`);
const { validationResult, body } = require(`express-validator`);




// This is for create
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: async function (req, file, cb) {
    console.log("OK");
    const data = JSON.parse(req.body.model)
    const errors = validationResult(data);
    let puppieCheck = await Puppie.findOne({ name: data.name });
    if (puppieCheck) {
      console.log("Sorry a Puppie with this name already exists");
      cb(null, "Null.jpg");
    }
    if (errors.isEmpty && !puppieCheck) {
      const uniqueSuffix = data.name
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
  }
})
var upload = multer({ storage: storage,},);



// This is for update
const storageUpdate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: async function (req, file, cb) {
    const data = JSON.parse(req.body.model)
    const errors = validationResult(data);
    if (!errors.isEmpty()) {
      console.log("Error in Details");
      cb(null, "Null.jpg");
    }
    if (errors.isEmpty) {
      const uniqueSuffix = data.name
      cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
  }
})
var uploadUpdate = multer({ storage: storageUpdate,},);




router.post("/",
  [
    body('name', `Enter a valid name`).isLength({ min: 3 }),
    body('color', "Enter a valid color").isLength({ min: 3 }),
    body('amount', "Enter a valid Amount").isLength({ min: 1 }),
    body('status', "Enter a valid Status").isLength({ min: 1 }),
    body(`birthday`, "Enter a valid dob").isLength({ min: 6 }),
    body('weight', `Enter a valid weight`).isLength({ min: 3 }),
    body('breed', "Enter a valid breed").isLength({ min: 3 }),
    body(`gender`, "Enter a valid gender").isLength({ min: 3 }),
    body(`about`, "Enter a valid about").isLength({ min: 10 }),
    body(`video1`, "Enter a valid Video Link").isLength({ min: 3 }),
    body(`video2`, "Enter a valid Video Link").isLength({ min: 3 }),
  ], verify,
  upload.fields([
    { name: 'files1', maxCount: 1 },
    { name: 'files2', maxCount: 1 },
    { name: 'files3', maxCount: 1 },
    { name: 'files4', maxCount: 1 },
    { name: 'files5', maxCount: 1 },
  ]),
  puppieController.puppie_create,
  
);


router.put("/:name",
body('name', `Enter a valid name`).isLength({ min: 3 }),
body('color', "Enter a valid color").isLength({ min: 3 }),
body('amount', "Enter a valid Amount").isLength({ min: 1 }),
body('status', "Enter a valid Status").isLength({ min: 1 }),
body(`birthday`, "Enter a valid dob").isLength({ min: 6 }),
body('weight', `Enter a valid weight`).isLength({ min: 3 }),
body('breed', "Enter a valid breed").isLength({ min: 3 }),
body(`gender`, "Enter a valid gender").isLength({ min: 3 }),
body(`about`, "Enter a valid about").isLength({ min: 10 }),
body(`video1`, "Enter a valid Video Link").isLength({ min: 3 }),
body(`video2`, "Enter a valid Video Link").isLength({ min: 3 }),
verify,
uploadUpdate.fields([
  { name: 'files1', maxCount: 1 },
  { name: 'files2', maxCount: 1 },
  { name: 'files3', maxCount: 1 },
  { name: 'files4', maxCount: 1 },
  { name: 'files5', maxCount: 1 },
]), puppieController.puppie_update);



router.delete("/:name", verify, puppieController.puppie_delete);

router.get("/gender/:gender", puppieController.puppie_gender);
router.get("/about/:name", puppieController.puppie_findByName);
router.get("/status/:status", puppieController.puppie_status);
router.get("/breed/:breed", puppieController.puppie_breed);

router.get("/:puppieId", puppieController.puppie_details);
router.get("/", puppieController.puppie_all);
module.exports = router;