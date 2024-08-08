const Tutorial = require("../models/tutorial.model");

const create = async (req, res) => {
  // Validate request
  //checks if the title field is present in the request body.
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save Tutorial in the database
  try {
    const data = await tutorial.save();
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

// Retrieve all Tutorials from the database.
const findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  try {
    const data = await Tutorial.find(condition);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

// Find a single Tutorial with an id
const findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Tutorial.findById(id);
    if (!data)
      res.status(404).send({
        message: `Not found tutorial with id - ${id}`,
      });
    else res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving tutorial with id ${id}`,
    });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

    if (!data)
      res.status(404).send({
        message: `Cannot update Tutorial with ${id}. Tutorial is not in the database.`,
      });
    else res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error updating Tutorial with id ${id}`,
    });
  }
};

// Delete a Tutorial with the specified id in the request
const deleteTutorial = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Tutorial.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
      });
    } else {
      res.send({
        message: "Tutorial was deleted successfully!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete Tutorial with id=" + id,
    });
  }
};

// Delete all Tutorials from the database.
const deleteAll = async (req, res) => {
  try {
    const data = await Tutorial.deleteMany();
    res.send({
      message: `${data.deletedCount} tutorials were deleted successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while removing all tutorials.",
    });
  }
};

// Find all published Tutorials
const findAllPublished = async (req, res) => {
  try {
    const data = await Tutorial.find({ published: true });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving tutorials",
    });
  }
};

module.exports = {
  create,
  findAll,
  findAllPublished,
  findOne,
  update,
  deleteTutorial,
  deleteAll,
};
