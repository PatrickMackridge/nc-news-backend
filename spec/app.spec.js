process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const { expect } = chai;

const connection = require("../db/connection");
const app = require("../app");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    it("GET 200 - responds with an object that contains an array if all topic objects with slug and description", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(result => {
          expect(result.body.topics).to.be.an("Array");
          result.body.topics.forEach(topic => {
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
          .then(result => {
            expect(result.body.user).to.be.an("Object");
            expect(result.body.user).to.contain.keys(
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
          .then(result => {
            expect(result.body).to.eql({
              msg: "This user does not exist",
              status: 404
            });
          });
      });
    });
  });
});
