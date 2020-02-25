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
});
