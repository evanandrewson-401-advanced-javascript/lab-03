'use strict';

const validator = require('../lib/validator.js');
let str = 'yes';
let numstr = '123';
let num = 1;
let arr = ['a', 'b'];
let obj = {x:'y'};
let func = () => {};
let bool = false;

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
  });

  it('arrays', () => {
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeTruthy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(func)).toBeFalsy();
    expect(validator.isObject(bool)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(func)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
  });

  it('functions', () => {
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
    expect(validator.isFunction(bool)).toBeFalsy();
  });

});

describe('performs array validation of', () => {

  const arrayOfStrings = ['a', 'b', 'c'];
  const arrayOfNumbers = [1, 2, 3];
  const arrayOfObjects = [{}, {}, {}];
  const arrayOfBooleans = [true, false, true];

  it('strings', () => {
    expect(validator.isArrayOfStrings(arrayOfStrings)).toBeTruthy();
    expect(validator.isArrayOfStrings(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfStrings(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfStrings(arrayOfBooleans)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isArrayOfNumbers(arrayOfStrings)).toBeFalsy();
    expect(validator.isArrayOfNumbers(arrayOfNumbers)).toBeTruthy();
    expect(validator.isArrayOfNumbers(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfNumbers(arrayOfBooleans)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isArrayOfObjects(arrayOfStrings)).toBeFalsy();
    expect(validator.isArrayOfObjects(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfObjects(arrayOfObjects)).toBeTruthy();
    expect(validator.isArrayOfObjects(arrayOfBooleans)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isArrayOfBooleans(arrayOfStrings)).toBeFalsy();
    expect(validator.isArrayOfBooleans(arrayOfNumbers)).toBeFalsy();
    expect(validator.isArrayOfBooleans(arrayOfObjects)).toBeFalsy();
    expect(validator.isArrayOfBooleans(arrayOfBooleans)).toBeTruthy();
  });
});

describe('get validator for', () => {

  it('strings', () => {
    expect(validator.getValidator('string')).toBe(validator.isString);
  });
  
  it('numbers', () => {
    expect(validator.getValidator('number')).toBe(validator.isNumber);
  });

  it('arrays', () => {
    expect(validator.getValidator('array')).toBe(validator.isArray);
  });

  it('objects', () => {
    expect(validator.getValidator('object')).toBe(validator.isObject);
  });

  it('booleans', () => {
    expect(validator.getValidator('boolean')).toBe(validator.isBoolean);
  });

  it('functions', () => {
    expect(validator.getValidator('function')).toBe(validator.isFunction);
  });

  it('array of strings', () => {
    expect(validator.getValidator('arrayOfStrings')).toBe(validator.isArrayOfStrings);
  });

  it('array of numbers', () => {
    expect(validator.getValidator('arrayOfNumbers')).toBe(validator.isArrayOfNumbers);
  });

  it('array of objects', () => {
    expect(validator.getValidator('arrayOfObjects')).toBe(validator.isArrayOfObjects);
  });

  it('array of booleans', () => {
    expect(validator.getValidator('arrayOfBooleans')).toBe(validator.isArrayOfBooleans);
  });

});

describe('test casters', () => {
  it('string caster', () => {
    expect(validator.isString(validator.stringCaster(str))).toBeTruthy();
    expect(validator.isString(validator.stringCaster(num))).toBeTruthy();
    expect(() => {
      validator.stringCaster(arr);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.stringCaster(obj);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.stringCaster(func);
    }).toThrow(validator.CastError);
    expect(validator.isString(validator.stringCaster(bool))).toBeTruthy();
  });
  it('boolean caster', () => {
    expect(() => {
      validator.booleanCaster(str);
    }).toThrow(validator.CastError);
    expect(validator.isBoolean(validator.booleanCaster(num))).toBeTruthy();
    expect(() => {
      validator.booleanCaster(arr);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.booleanCaster(obj);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.booleanCaster(func);
    }).toThrow(validator.CastError);
    expect(validator.isBoolean(validator.booleanCaster(bool))).toBeTruthy();
  });
  it('number caster', () => {
    expect(() => {
      validator.numberCaster(str);
    }).toThrow(validator.CastError);
    expect(validator.isNumber(validator.numberCaster(numstr))).toBeTruthy();
    expect(validator.isNumber(validator.numberCaster(num))).toBeTruthy();
    expect(() => {
      validator.numberCaster(arr);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.numberCaster(obj);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.numberCaster(func);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.numberCaster(bool);
    }).toThrow(validator.CastError);
  });
  it('date caster', () => {
    expect(() => {
      validator.dateCaster(str);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.dateCaster(num);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.dateCaster(arr);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.dateCaster(obj);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.dateCaster(func);
    }).toThrow(validator.CastError);
    expect(() => {
      validator.dateCaster(bool);
    }).toThrow(validator.CastError);
  });
});
