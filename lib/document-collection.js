const files = require('./files');
const shortid = require('shortid');
const path = require('path');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    object.id = shortid.generate();
    const json = JSON.stringify(object);
    const filePath = `./${this.folder}/${object.id}.json`;
    return files.writeFile(filePath, json)
      .then(() => {
        return object;
      })
      .catch(err => {
        console.log(err);
      });
  }

  get(id) {
    const filePath = `./${this.folder}/${id}.json`;
    return files.readFile(filePath)
      .then(data => {
        return JSON.parse(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAll() {
    return files.readdir(this.folder)
      .then(results => {
        return Promise.all(
          results.map(result => {
            const id = path.basename(result, '.json');
            return this.get(id);
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = DocumentCollection;