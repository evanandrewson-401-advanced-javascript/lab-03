const files = require('./files');
const shortid = require('shortid');
const path = require('path');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    // TODO:
    // 1. assign an id
    object.id = shortid.generate();
    // 2. serialize object
    const json = JSON.stringify(object);
    // 3. use promisified fs to write to folder path using id.json as file name
    const filePath = `/${this.folder}/${object.id}.json`;
    return files.writeFile(filePath, json)
    // 4. "return" object (which now has an id)
      .then(() => {
        return object;
      })
    // 5. if expected, turn promisified fs errors into meaningful database errors
      .catch(err => {
        console.log(err);
      });
  }

  get(id) {
    // TODO:
    // 1. create file path from id
    const filePath = `/${this.folder}/${id}.json`;
    // 2. use promisified fs to read file
    return files.readFile(filePath)
    // 3. deserialize contents
    // 4. "return" object
      .then(data => {
        return JSON.parse(data);
      })
    // 5. if expected, turn promisified fs errors into meaningful database errors
      .catch(err => {
        console.log(err);
      });
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    return files.readdir(this.folder)
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
      .then(results => {
        return Promise.all(
          results.map(result => {
            const id = path.basename(result);
            this.get(id);
          })
        );
      })
    // 4. if expected, turn promisified fs errors into meaningful database errors
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = DocumentCollection;