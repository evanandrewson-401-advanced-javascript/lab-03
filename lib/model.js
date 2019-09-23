const Schema = require('./Schema');
const Database = require('./database');

class Model {
  constructor(name, schemaConfig) {
    // Get a DocumentCollection instance from Database using name
    // and store _the promise_ on "this"
    this.collectionPromise = Database.getCollection(name);

    // Create a Schema instance passing in config
    // and store on "this"
    this.schema = new Schema(schemaConfig);
  }

  create(model) {
    // chain onto the this.collection promise
    // so that we know the db is ready
    // 1. validate model using schema
    const record = this.schema.validate(model);

    // 2. save returned object to document collection
    return this.collectionPromise
      .then(collection => {
        return collection.save(record);
      });

  }

  findById(id) {
    // chain onto the this.collection promise
    // so that we know the db is ready
    return this.collectionPromise
      .then(collection => {
        return collection.get(id);
      });
      // use document collection to retrieve model
  }

  find() {
    // chain onto the this.collection promise
    // so that we know the db is ready
    return this.collectionPromise
      .then(collection => {
        return collection.getAll();
      });
      // use document collection to retrieve all models
  }
}

module.exports = Model;