const path = require('path');

jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const documentCollection = new DocumentCollection('folder');

describe('Document Collection', () => {
  it('saves file', () => {
    const object = { key: 'value' };
    writeFile.mockResolvedValue(object);

    documentCollection.save(object)
      .then(() => {
        expect(writeFile.mock.calls.length).toBe(1);
        expect(writeFile.mock.calls[0][1]).toBe(JSON.stringify(object));
      });
  });
  it('gets file', () => {
    const id = 'fakeid';
    const object = { key: 'value' };
    readFile.mockResolvedValue(JSON.stringify(object));

    return documentCollection.get(id)
      .then((result) => {
        expect(readFile.mock.calls.length).toBe(1);
        expect(readFile.mock.calls[0][0]).toBe('/folder/' + id + '.json');
        expect(result).toEqual(object);
      });
  });
  it('gets all files', () => {
    readdir.mockResolvedValue([]);

    return documentCollection.getAll()
      .then((result) => {
        expect(readdir.mock.calls.length).toBe(1);
        console.log(readdir.mock.calls);
        expect(readdir.mock.calls[0][0]).toEqual('folder');
        expect(result).toEqual([]);
      });
  });
});
