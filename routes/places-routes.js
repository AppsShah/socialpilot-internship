const express = require("express");
const { check } = require("express-validator");

const placeControllers = require("../controllers/places-controller");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placeControllers.findPlaceById);
router.get("/user/:uid", placeControllers.findPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("amount").not().isEmpty(),
    check("end_time").not().isEmpty(),
  ],
  placeControllers.createPlace
);

router.post(
  "/bid/:pid",
  [
    check("userId").isMongoId(),
    check("amount").not().isEmpty(),
    check("placeId").isMongoId(),
  ],
  placeControllers.postBid
);

router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placeControllers.updatePlace
);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
