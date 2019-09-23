const Schema = require('../lib/Schema');

describe('Schema', () => {

  // add a test schema
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

  const schema = new Schema(personSchema);

  it('validates a correct model', () => {
    const person = {
      firstName: 'Chris',
      lastName: 'Sample',
      married: true,
      kids: 3,
    };

    const data = schema.validate(person);
    expect(data).toEqual(person);
  });

  it('throws on invalid model', () => {
    const person = {
      firstName: 'Chris',
      lastName: 'Sample',
      married: '13 years',
      kids: 'yes',
    };
    expect(() => {
      schema.Validate(person);
    }).toThrow(schema.modelError);
  });

  // more test cases...
});