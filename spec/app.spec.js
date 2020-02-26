process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const chaiSorted = require("sams-chai-sorted");
const { expect } = chai;

chai.use(chaiSorted);

const connection = require("../db/connection");
const app = require("../app");

describe("/api", () => {
  after(() => connection.destroy());
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("/topics", () => {
    it("GET 200 - responds with an object that contains an array if all topic objects with slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("Array");
          res.body.topics.forEach(topic => {
            expect(topic).to.contain.keys("description", "slug");
          });
        });
    });
  });
  describe("/users", () => {
    describe("/:username", () => {
      it("GET 200 - responds with the user object corresponding to the given username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.user).to.be.an("Object");
            expect(res.body.user).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          });
      });
      it("GET 404 - responds with an error when given a non-existent username", () => {
        return request(app)
          .get("/api/users/not-a-yuser")
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({
              msg: "This user does not exist",
              status: 404
            });
          });
      });
    });
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      it("GET 200 - responds with the article object corresponding to the given article_id with added comment count", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an("Object");
            expect(res.body.article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET 404 - responds with an error when given a non-existent article id", () => {
        return request(app)
          .get("/api/articles/999")
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({
              msg: "This article does not exist",
              status: 404
            });
          });
      });
      it("GET 400 - responds with an error when given an invalid article id", () => {
        return request(app)
          .get("/api/articles/gimme-an-article")
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({
              msg: "Invalid data input type"
            });
          });
      });
      it("PATCH 200 - updates specified article's votes by the amount given", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys([
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            ]);
            expect(res.body.article.votes).to.equal(101);
          });
      });
      it("PATCH 200 - update of votes works with minus numbers", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -200 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys([
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            ]);
            expect(res.body.article.votes).to.equal(-100);
          });
      });
      it("PATCH 400 - throws an error when given an invalid article id", () => {
        return request(app)
          .patch("/api/articles/no-article-here")
          .send({ inc_votes: 10 })
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({
              msg: "Invalid data input type"
            });
          });
      });
      it("PATCH 404 - throws an error when given an article id that doesn't exist", () => {
        return request(app)
          .patch("/api/articles/999")
          .send({ inc_votes: 10 })
          .expect(404)
          .then(res => {
            expect(res.body).to.eql({
              msg: "This article does not exist",
              status: 404
            });
          });
      });
      it("PATCH 400 - throws an error when inc_votes is set to an invalid value", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "LOADS OF VOTES!" })
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: "Invalid data input type" });
          });
      });
      it("PATCH 400 - throws an error when trying to update a value other than inc_votes", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ username: "newUser" })
          .expect(400)
          .then(res => {
            expect(res.body).to.eql({ msg: "Invalid data input type" });
          });
      });
      describe("/comments", () => {
        it("POST 200 - posts a new comment to the article specified by the article_id parameter", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              username: "butter_bridge",
              body: "This article changed my life - FOR THE WORSE!!!"
            })
            .expect(200)
            .then(res => {
              expect(res.body.comment).to.have.all.keys([
                "article_id",
                "author",
                "body",
                "comment_id",
                "created_at",
                "votes"
              ]);
            });
        });
        it("POST 400 - throws an error when given an invalid article id", () => {
          return request(app)
            .post("/api/articles/articleNumber5/comments")
            .send({
              username: "butter_bridge",
              body: "This article changed my life - FOR THE WORSE!!!"
            })
            .expect(400)
            .then(res => {
              expect(res.body).to.eql({ msg: "Invalid data input type" });
            });
        });
        it("POST 404 - throws an error when given a non-existent article id", () => {
          return request(app)
            .post("/api/articles/999/comments")
            .send({
              username: "butter_bridge",
              body: "This article changed my life - FOR THE WORSE!!!"
            })
            .expect(400)
            .then(res => {
              expect(res.body).to.eql({
                msg: "Invalid input data"
              });
            });
        });
        it("POST 400 - throws an error when given a non-existent username", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              username: "U.Z.A",
              body: "This article changed my life - FOR THE WORSE!!!"
            })
            .expect(400)
            .then(res => {
              expect(res.body).to.eql({
                msg: "Invalid input data"
              });
            });
        });
        it("POST 400 - throws an error when given an invalid key", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({
              username: "butter_bridge",
              whatTheCommentSays:
                "This article changed my life - FOR THE WORSE!!!"
            })
            .expect(400)
            .then(res => {
              expect(res.body).to.eql({
                status: 400,
                msg: "Invalid input data"
              });
            });
        });
      });
    });
  });
});
