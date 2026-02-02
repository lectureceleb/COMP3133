const chai = require("chai");
const expect = chai.expect;
const { add, mul, div, sub } = require("../app/calculator");

describe("add()", () => {
  it("should return the number 10", () => {
    const result = add(3,7);
    expect(result).to.equal(10);
  });

  it("should return a negative number", () => {
    const result = add(3,7);
    expect(result).to.below(0);
  });
});

describe("mul()", () => {
  it("should return the number 33", () => {
    const result = mul(3,11);
    expect(result).to.equal(33);
  });

  it("should return a negative number", () => {
    const result = mul(-9,-9);
    expect(result).to.below(0);
  });
});

describe("div()", () => {
  it("should return a positive number", () => {
    const result = div(99,3);
    expect(result).to.above(0);
  });

  it("should return 0", () => {
    const result = div(3,0);
    expect(result).to.equal(0);
  });
});

describe("sub()", () => {
  it("should return the number 7", () => {
    const result = sub(10,3);
    expect(result).to.equal(7);
  });

  it("should return the number 100", () => {
    const result = sub(-100,0);
    expect(result).to.equal(100);
  });
});