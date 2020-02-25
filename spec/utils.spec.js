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
            "This man just wanted a bite of his sandwich - you won't believe what happened next!"
        },
        {
          article_id: 3,
          title:
            "Liquiditch - The new water sport taking the East Midlands by storm!"
        },
        {}
      ])
    ).to.eql({
      "Why I will never hire a cat": 1,
      "This man just wanted a bite of his sandwich - you won't believe what happened next!": 2,
      "Liquiditch - The new water sport taking the East Midlands by storm!": 3
    });
  });
});

describe("formatComments", () => {
  it("returns an empty array when passed an empty array", () => {
    expect(formatComments([], {})).to.eql([]);
  });
  it("returns an array of a single formatted comment object when passed an array of one comment object", () => {
    const comments = [
      {
        body:
          "This is purr discrimination! I've hired plenty of cats at my dental practice over the years and they're some of the hardest working employees I've ever had",
        belongs_to: "Why I will never hire a cat",
        created_by: "CatManDo",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const refObj = {
      "Why I will never hire a cat": 1
    };
    const formattedComments = [
      {
        body:
          "This is purr discrimination! I've hired plenty of cats at my dental practice over the years and they're some of the hardest working employees I've ever had",
        article_id: 1,
        author: "CatManDo",
        votes: 16,
        created_at: "Wed, 22 Nov 2017 12:36:03 GMT"
      }
    ];
    expect(formatComments(comments, refObj)).to.eql(formattedComments);
  });
  it("returns an array of multiple formatted comment objects when passed an array of multiple comment objects", () => {
    const comments = [
      {
        body:
          "This is purr discrimination! I've hired plenty of cats at my dental practice over the years and they're some of the hardest working employees I've ever had",
        belongs_to: "Why I will never hire a cat",
        created_by: "CatManDo",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          "About time someone had the guts to stand up to the PC (Pro Cat) brigade and speake for the majority! There lazy freeloaders, send them back to Ancient Egypt!",
        belongs_to: "Why I will never hire a cat",
        created_by: "Dogz4Eva",
        votes: 3,
        created_at: 1582556606170
      },
      {
        body:
          "So a man drops his lunch on the floor and that is deemed worthy of a whole article? *Sigh* I remember when this website used to be good",
        belongs_to:
          "This man just wanted a bite of his sandwich - you won't believe what happened next!",
        created_by: "DisappointedButNotSuprised",
        votes: 12,
        created_at: 1511354163389
      },
      {
        body:
          "AHAHAHA LOOK AT HIS FACE!! HE DROPPED HIS SANDWICH, HE'S SO UPSET!! I LOVE OTHER PEOPLE'S MISRY! GREAT FIND! #lol #lolAgain #3lolz #psql #Sadwich",
        belongs_to:
          "This man just wanted a bite of his sandwich - you won't believe what happened next!",
        created_by: "ILuvThaInternet",
        votes: 1,
        created_at: 1511354163389
      },
      {
        body:
          "Look's like gr8 fun! Which mean is only a mater of time befoer its banned by the EU Health and Saftey fun police!",
        belongs_to:
          "Liquiditch - The new water sport taking the East Midlands by storm!",
        created_by: "OldSkool",
        votes: 4,
        created_at: 1511354163389
      },
      {
        body:
          "Just another elitist sport designed to exclude the common man! Who can afford iron diving shoes in this economic climate?!? And dont even get me started on the plastic waste being caused by those balloons - for shame!!!",
        belongs_to:
          "Liquiditch - The new water sport taking the East Midlands by storm!",
        created_by: "DisappointedButNotSuprised",
        votes: 8,
        created_at: 1511354163389
      }
    ];
    const refObj = {
      "Why I will never hire a cat": 1,
      "This man just wanted a bite of his sandwich - you won't believe what happened next!": 2,
      "Liquiditch - The new water sport taking the East Midlands by storm!": 3
    };
    const formattedComments = [
      {
        body:
          "This is purr discrimination! I've hired plenty of cats at my dental practice over the years and they're some of the hardest working employees I've ever had",
        article_id: 1,
        author: "CatManDo",
        votes: 16,
        created_at: "Wed, 22 Nov 2017 12:36:03 GMT"
      },
      {
        body:
          "About time someone had the guts to stand up to the PC (Pro Cat) brigade and speake for the majority! There lazy freeloaders, send them back to Ancient Egypt!",
        article_id: 1,
        author: "Dogz4Eva",
        votes: 3,
        created_at: "Mon, 24 Feb 2020 15:03:26 GMT"
      },
      {
        body:
          "So a man drops his lunch on the floor and that is deemed worthy of a whole article? *Sigh* I remember when this website used to be good",
        article_id: 2,
        author: "DisappointedButNotSuprised",
        votes: 12,
        created_at: "Wed, 22 Nov 2017 12:36:03 GMT"
      },
      {
        body:
          "AHAHAHA LOOK AT HIS FACE!! HE DROPPED HIS SANDWICH, HE'S SO UPSET!! I LOVE OTHER PEOPLE'S MISRY! GREAT FIND! #lol #lolAgain #3lolz #psql #Sadwich",
        article_id: 2,
        author: "ILuvThaInternet",
        votes: 1,
        created_at: "Wed, 22 Nov 2017 12:36:03 GMT"
      },
      {
        body:
          "Look's like gr8 fun! Which mean is only a mater of time befoer its banned by the EU Health and Saftey fun police!",
        article_id: 3,
        author: "OldSkool",
        votes: 4,
        created_at: "Wed, 22 Nov 2017 12:36:03 GMT"
      },
      {
        body:
          "Just another elitist sport designed to exclude the common man! Who can afford iron diving shoes in this economic climate?!? And dont even get me started on the plastic waste being caused by those balloons - for shame!!!",
        article_id: 3,
        author: "DisappointedButNotSuprised",
        votes: 8,
        created_at: "Wed, 22 Nov 2017 12:36:03 GMT"
      }
    ];
    expect(formatComments(comments, refObj)).to.eql(formattedComments);
  });
});
