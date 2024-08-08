const mongoose = require("mongoose");

const TutorialSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

TutorialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = new mongoose.model("tutorials", TutorialSchema);

//****************************************************//

/** File Flow
 * Importing Mongoose.
 * Define Schema.
 * Custom JSON method. (not necessary)
 * Export Model to perform CRUD operations.
 */

//****************************************************//

/**
 * Q1. Relation between database, collection, schema and models?

1. Database:
What it is: A database is a container for collections. In MongoDB, a database is where data is stored.
Example: If you're building a tutorial platform, you might have a database called "tutorialPlatformDB".

2. Collection:
What it is: A collection is a grouping of MongoDB documents. It is equivalent to a table in relational databases. Each document in a collection can have different structures, but generally, they follow a defined schema.
Example: Within the "tutorialPlatformDB" database, you might have a collection called "tutorials", where each document represents a single tutorial.

3. Schema:
What it is: A schema is a blueprint for a MongoDB document. It defines the structure of the documents in a collection, including fields, their data types, and any validation rules. In Mongoose, schemas are used to enforce structure and validation.
Example: For the "tutorials" collection, a schema might define that each document should have a title (string), description (string), and published (boolean).

4. Model:
What it is: A model in Mongoose is a constructor compiled from a schema. It provides an interface to interact with the documents in a collection (e.g., creating, reading, updating, and deleting documents). Models are instances of a schema that are tied to a specific collection.
Example: You could create a model from the "TutorialSchema" that interacts with the "tutorials" collection. This model will allow you to perform operations like Tutorial.find(), Tutorial.create(), etc.

How They Relate:

* Database contains collections.
* Each collection contains multiple documents that follow a certain schema.
* Schemas define the structure of documents within a collection.
* Models are used to interact with the documents in a collection and are created using schemas.

In summary:
The database is the top-level container.
Collections are within the database and hold the actual data.
Schemas define the shape of that data.
Models are the tools used to interact with the data in those collections based on the schemas.
 */

//****************************************************//

/** Q2. { timestamps: true }
 * The { timestamps: true } option automatically adds createdAt and updatedAt fields to each document.
 */

//****************************************************//

/* Q3 module.exports = new mongoose.model("tutorials", TutorialSchema);
"tutorials" is the name of the collection.
 */

//****************************************************//

/** Q4.
 * TutorialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

This block of code defines a custom method toJSON for a Mongoose schema called TutorialSchema. This method customizes how Mongoose documents are converted to JSON. Let’s break it down step by step:

1. TutorialSchema.method("toJSON", function () {...}):
What it does: This adds a custom instance method named toJSON to the schema. This method is automatically called whenever a document is converted to a JSON object (e.g., when sending a document as a response in an API).
Why it’s used: By overriding the toJSON method, you can modify how the data is formatted or exclude certain fields before the document is serialized to JSON.

2. this.toObject():
What it does: This converts the Mongoose document into a plain JavaScript object. The document in its raw form has some additional properties and methods that are not part of the actual data (e.g., _id, __v, etc.).
Why it’s used: By converting it to a plain object, you can manipulate the data more easily.

3. const { __v, _id, ...object } = this.toObject();:
What it does: This is using object destructuring to extract the __v and _id properties from the object, while collecting the rest of the properties into a new object.
__v: This is a Mongoose internal version key that keeps track of document revisions when using the versionKey option. It's often not needed in the API responses, so it’s removed.
_id: This is the default MongoDB identifier for the document. It’s commonly used, but it may be renamed for easier use in JSON responses.
...object: This contains all the remaining properties from the document after excluding __v and _id.

4. object.id = _id;:
What it does: This renames _id to id and adds it to the object.
Why it’s done: The _id field, which is the MongoDB identifier, is renamed to id to make it more conventional and user-friendly in JSON output, especially when consumed by front-end applications.

5. return object;:
What it does: Finally, the modified object (without __v, with _id renamed to id) is returned.
Why it’s done: This returned object will be the representation of the document when it’s converted to JSON.

Summary:
The toJSON method customizes the JSON representation of a Mongoose document. It:
Removes the __v field (version key) from the output.
Renames the _id field to id.
Returns the cleaned and modified object.

This is particularly useful when sending data to a client, as it simplifies the output by removing unnecessary internal fields and providing a more readable id field.

 */