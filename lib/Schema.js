const validator = require('../lib/validator.js');

class Schema {
  /**
   * Create a model schema
   * @param {object} schema - the schema to apply to models
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * Run validation on the supplied model 
   * @param {object} model - the model to validate
   * @throws {ModelError} throws if model does not conform to schema
   * @returns {object} - validated data record
   */
  validate(model) {
    const errorArray = [];
    const values = Object.values(model);
    for(let i = 0; i < Object.entries(this.schema).length; i++) {
      const caster = validator.getCaster(Object.entries(this.schema)[i][1].type);
      console.log(Object.entries(this.schema)[i][1].type);
      try {
        caster(values[i]);
      }
      catch(err) {
        errorArray.push(err);
      }
    }
    if(errorArray.length) {
      throw new ModelError;
    } else {
      return model;
    }
  }
}

class ModelError extends Error {
  constructor() {
    super(`input is invalid`);
  }
}

module.exports = Schema;