const DocumentCollection = require('./lib/document-collection');

const documents = new DocumentCollection('savedObjects');

const object1 = { key1: 'value1' };
const object2 = { key2: 'value2' };

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
