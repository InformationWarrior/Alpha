const Tutorial = require("../models/tutorial.model");

const create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).json({ message: "Content can not be empty!" });
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
    res.status(500).json({
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
  const {id} = req.params;
  try {
    const data = await Tutorial.findById(id);
    if (!data)
      res.status(404).json({
        message: `Not found tutorial with id - ${id}`,
      });
    else res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
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

  const {id} = req.params;

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
  const {id} = req.params
  try {
    const data = await Tutorial.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Tutorial with id = ${id}. Maybe Tutorial was not found!`,
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


//****************************************************//

/** Q1 const Tutorial = require("../models/tutorial.model");

Purpose:
This line imports the Tutorial model from the specified file path (../models/tutorial.model).

Function:
Model Importation: By importing the model, you gain access to the Mongoose schema and methods defined in tutorial.model.js. This allows you to interact with the Tutorial collection in the MongoDB database using the model’s methods.
Usage: You can use the Tutorial model to perform CRUD operations and other database queries. For example, you can create new documents, find existing ones, update them, or delete them.
Example Context:

In the provided code, the Tutorial model is used in various controller methods (like create, findAll, findOne, etc.) to interact with the database. This import is essential for these methods to function correctly. 
 */

//****************************************************//

/** Q2 module.exports = { create, findAll, findAllPublished, findOne, update, deleteTutorial, deleteAll };

Purpose:
This line exports the controller functions from the current module so that they can be used in other parts of the application.
Function:

Module Exportation: By exporting the functions, you make them available for import in other files. This is typically done to separate concerns in an application, making it modular and easier to maintain.

Controller Functions: The exported object includes various functions like create, findAll, findAllPublished, findOne, update, deleteTutorial, and deleteAll. These functions handle different operations related to the Tutorial model.

Example Context:
In the routing file (e.g., tutorial.routes.js), these exported functions are required and used to handle HTTP requests. For instance, router.post("/", tutorials.create); uses the create function from the exported object to handle POST requests to the / endpoint.
 */

//****************************************************//

/** 
if (!req.body.title) {
  res.status(400).send({ message: "Content can not be empty!" });
  return;
} 
  The function first checks if the title field is present in the request body (req.body.title).
If the title is missing, it responds with a 400 Bad Request status and a message indicating that the content cannot be empty.
The return statement is used to exit the function early, so no further processing is done if the title is missing.
*/

//****************************************************//

/** res.send() and res.json()
 * res.send(): Can be used to send various types of responses (HTML, text, JSON, etc.). If you pass an object, Express will automatically convert it to JSON and send it.
res.json(): Specifically used to send a JSON response. It is more explicit and is a good practice when you know you're working with JSON data.
 */

//****************************************************//

/** FindAll method.
 * 
const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

Getting the Query Parameter:
const title = req.query.title;
This line retrieves the title query parameter from the request's URL. For example, if the URL is /api/tutorials?title=example, title would be set to "example".

2. Building the Query Condition:
var condition = title
  ? { title: { $regex: new RegExp(title), $options: "i" } }
  : {};
If a title is provided in the query parameter, a condition is created to match documents where the title field contains the specified string, using a regular expression ($regex).
The "i" option makes the search case-insensitive.
If no title is provided, the condition is an empty object {}, which means that all tutorials will be retrieved.
*/

//****************************************************//

/** Update Method
 const data = await Tutorial.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });

Options Object { useFindAndModify: false }:
useFindAndModify: false:
This option tells Mongoose to use the native MongoDB findOneAndUpdate() function rather than the legacy findAndModify() function.
The findAndModify() function is deprecated in MongoDB, so setting this option to false ensures that Mongoose uses the newer method that adheres to the latest MongoDB standards.

 */

//****************************************************//

/** Mongoose CRUD methods
 * 
 Here are the main Mongoose methods used to perform CRUD operations on a MongoDB database:

Create
Model.create(doc): Creates a new document and saves it to the database.
new Model(doc).save(): Creates an instance of a model and saves it.

Read
Model.find(conditions): Retrieves all documents that match the conditions.
Model.findById(id): Retrieves a single document by its _id.
Model.findOne(conditions): Retrieves the first document that matches the conditions.

Update
Model.findByIdAndUpdate(id, update, options): Finds a document by its _id and updates it.
Model.updateOne(conditions, update, options): Updates a single document that matches the conditions.
Model.updateMany(conditions, update, options): Updates multiple documents that match the conditions.

Delete
Model.findByIdAndRemove(id, options): Finds a document by its _id and removes it.
Model.deleteOne(conditions): Deletes a single document that matches the conditions.
Model.deleteMany(conditions): Deletes multiple documents that match the conditions.
 */

//****************************************************//


/** MongoDB CRUD methods
 * 
 * Here are some important MongoDB methods commonly used for CRUD operations:

Create
insertOne(document):

Inserts a single document into a collection.
Example: db.collection('users').insertOne({ name: 'John', age: 30 })
insertMany(documents):

Inserts multiple documents into a collection.
Example: db.collection('users').insertMany([{ name: 'John' }, { name: 'Jane' }])

Read
find(query, projection):
Retrieves documents that match the query. Can include a projection to limit fields.
Example: db.collection('users').find({ age: { $gt: 25 } }).toArray()
findOne(query, projection):

Retrieves a single document that matches the query.
Example: db.collection('users').findOne({ name: 'John' })

Update
updateOne(filter, update, options):

Updates a single document that matches the filter criteria.
Example: db.collection('users').updateOne({ name: 'John' }, { $set: { age: 31 } })
updateMany(filter, update, options):

Updates multiple documents that match the filter criteria.
Example: db.collection('users').updateMany({ age: { $gt: 25 } }, { $set: { status: 'Active' } })
findOneAndUpdate(filter, update, options):

Finds a document and updates it, returning the original or updated document.
Example: db.collection('users').findOneAndUpdate({ name: 'John' }, { $set: { age: 31 } })

Delete
deleteOne(filter):

Deletes a single document that matches the filter criteria.
Example: db.collection('users').deleteOne({ name: 'John' })
deleteMany(filter):

Deletes multiple documents that match the filter criteria.
Example: db.collection('users').deleteMany({ age: { $lt: 25 } })
findOneAndDelete(filter, options):

Finds and deletes a document, returning the deleted document.
Example: db.collection('users').findOneAndDelete({ name: 'John' })

 */