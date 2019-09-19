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

    console.log(documentCollection);
    documentCollection.save(object)
      .then(() => {
        expect(writeFile.mock.calls.length).toBe(1);
        expect(writeFile.mock.calls[0][1]).toBe(JSON.stringify(object));
      });
  });
});
