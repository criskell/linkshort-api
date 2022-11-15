import request from "supertest";
import bcrypt from "bcrypt";
import { expect } from "chai";

import app from "../../src/app.js";
import db, { truncate } from "../../src/database.js";

describe("Autenticação", () => {
  beforeEach(() => {
    return truncate();    
  });

  describe("POST /auth/login", () => {
    it("retornar um token caso tudo esteja correto", async function () {
      await db.models.User.create({
        name: "foo",
        email: "foo@foo.com",
        password: await bcrypt.hash("123456", 10)
      });

      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "foo@foo.com",
          password: "123456"
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.a.property("token");
    });
  });

  describe("POST /auth/register", () => {
    it("criar o usuário caso tudo esteja correto", async () => {
      const response = await request(app)
        .post("/auth/register")
        .send({
          name: "foo",
          email: "foo@foo.com",
          password: "123456"
        });

      const count = await db.models.User.count({
        where: {
          email: "foo@foo.com"
        }
      });

      expect(response.status).to.equal(201);
      expect(count).to.be.equal(1);
    });
  });
});