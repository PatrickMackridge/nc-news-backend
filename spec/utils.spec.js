const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("returns an array of one object with the timestamp converted into a Javascript date object when passed an array of one object", () => {
    const input = [
      {
        article_id: 1,
        title: "testArticle",
        body: "hello",
        votes: 5,
        topic: "test",
        author: "testUser",
        created_at: 1582556606170
      }
    ];
    const result = [
      {
        article_id: 1,
        title: "testArticle",
        body: "hello",
        votes: 5,
        topic: "test",
        author: "testUser",
        created_at: "Mon, 24 Feb 2020 15:03:26 GMT"
      }
    ];
    expect(formatDates(input)).to.eql(result);
  });
  it("returns an array of multiple objects with the timestamp converted into a Javascript date object when passed an array of multiple objects", () => {
    const input = [
      {
        article_id: 1,
        title: "testArticle",
        body: "hello",
        votes: 5,
        topic: "test",
        author: "testUser",
        created_at: 1582556606170
      },
      {
        article_id: 2,
        title: "AnotherTestArticle",
        body: "goodbye",
        votes: 12,
        topic: "test",
        author: "testUser2",
        created_at: 1582559219099
      },
      {
        article_id: 3,
        title: "OneMoreTestArticle",
        body: "goodbye again...?",
        votes: -2,
        topic: "test",
        author: "testUser3",
        created_at: 1582559766829
      }
    ];
    const result = [
      {
        article_id: 1,
        title: "testArticle",
        body: "hello",
        votes: 5,
        topic: "test",
        author: "testUser",
        created_at: "Mon, 24 Feb 2020 15:03:26 GMT"
      },
      {
        article_id: 2,
        title: "AnotherTestArticle",
        body: "goodbye",
        votes: 12,
        topic: "test",
        author: "testUser2",
        created_at: "Mon, 24 Feb 2020 15:46:59 GMT"
      },
      {
        article_id: 3,
        title: "OneMoreTestArticle",
        body: "goodbye again...?",
        votes: -2,
        topic: "test",
        author: "testUser3",
        created_at: "Mon, 24 Feb 2020 15:56:06 GMT"
      }
    ];
    expect(formatDates(input)).to.eql(result);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).to.eql({});
  });
  it("returns an empty object when passed an array with an empty object", () => {
    expect(makeRefObj([{}])).to.eql({});
  });
  it("returns an object with a single key-value pair when passed an array with one object", () => {
    expect(
      makeRefObj([
        {
          article_id: 1,
          title: "Why I will never hire a cat"
        }
      ])
    ).to.eql({ "Why I will never hire a cat": 1 });
  });
  it("returns an object with a single key-value pair when passed an array with one object", () => {
    expect(
      makeRefObj([
        {
          article_id: 1,
          title: "Why I will never hire a cat"
        },
        {
          article_id: 2,
          title:
            "This man was about to take a bite of his sandwich - you won't believe what happened next!"
        },
        {
          article_id: 3,
          title:
            "Liquiditch - The new water sport taking the Italian Riviera by storm!"
        },
        {}
      ])
    ).to.eql({
      "Why I will never hire a cat": 1,
      "This man was about to take a bite of his sandwich - you won't believe what happened next!": 2,
      "Liquiditch - The new water sport taking the Italian Riviera by storm!": 3
    });
  });
});

describe("formatComments", () => {});
