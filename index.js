const DocumentCollection = require('./lib/document-collection');
const Model = require('./lib/model');
const Database = require('./lib/database');

const documents = new DocumentCollection('savedObjects');

const object1 = { key1: 'value1' };
const object2 = { key2: 'value2' };
const personSchema = {
  firstName: {
    type: 'string',
    required: true,
  },
  lastName: {
    type: 'string',
    required: true,
  },
  married: {
    type: 'boolean',
    required: true,
  },
  kids: {
    type: 'number',
    required: true,
  },
};
const person = {
  firstName: 'Chris',
  lastName: 'Sample',
  married: true,
  kids: 3,
};

documents.save(object1);
documents.save(object2);

documents.get(object1.id)
  .then((result) => {
    console.log(result);
  });
documents.get(object2.id)
  .then((result) => {
    console.log(result);
  });

documents.getAll()
  .then((result) => {
    console.log(result);
  });

Database.connect('savedObjects');
const model = new Model ('person', personSchema);
model.create(person)
  .then(() => {
    console.log(model.findById('dJVJtwo7Q'));
    console.log(model.find());
  });



