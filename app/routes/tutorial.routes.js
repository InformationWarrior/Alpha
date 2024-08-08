const router = require("express").Router();
const tutorials = require("../controllers/tutorial.controller.js");

router.post("/", tutorials.create);

router.get("/", tutorials.findAll);

router.get("/published", tutorials.findAllPublished);

router.get("/:id", tutorials.findOne);

router.put("/:id", tutorials.update);

router.delete("/:id", tutorials.deleteTutorial);

router.delete("/", tutorials.deleteAll);

module.exports = router;