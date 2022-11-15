import request from "supertest";
import bcrypt from "bcrypt";
import { expect } from "chai";
import jwt from "jsonwebtoken";

import app from "../../src/app.js";
import db, { truncate } from "../../src/database.js";

describe("Links", () => {
  let token;
  let user;

  beforeEach(async () => {
    await truncate();

    user = await db.models.User.create({
      name: "foo",
      email: "foo@foo.com",
      password: await bcrypt.hash("123456", 10)
    });

    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  });

  afterEach(() => {
    return truncate();
  });

  describe("GET /links", () => {
    it("retorna os links associados ao usuário atual", async () => {
      const link = await db.models.Link.create({
        code: "foobar",
        fullurl: "https://fullbar.com",
        userId: user.id,
      });

      const response = await request(app).get("/links")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.be.equal(200);
      expect(response.body.data[0].id).to.be.equal(link.id);
    });
  });

  describe("POST /links", () => {
    it("cria um link associado ao usuário atual", async () => {
      const response = await request(app).post("/links")
        .set("Authorization", `Bearer ${token}`)
        .send({
          code: "aaa",
          fullurl: "https://bar.com"
        });

      expect(response.status).to.be.equal(200);
      expect(response.body.redirectpath).to.be.equal(`/go/aaa`);
    });
  });

  describe("GET /:linkId", () => {
    it("retorna as informações de um link", async () => {
      const link = await db.models.Link.create({
        code: "foobar",
        fullurl: "https://fullbar.com",
        userId: user.id,
      });

      const response = await request(app).get("/links/" + link.id)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.be.equal(200);
      expect(response.body.data).to.have.a.property("redirectpath");
      expect(response.body.data.redirectpath).to.be.equal("/go/foobar");
    });
  });

  describe("PUT /:linkId", () => {
    it("atualiza as informações de um link", async () => {
      const link = await db.models.Link.create({
        code: "foobar",
        fullurl: "https://fullbar.com",
        userId: user.id,
      });

      const response = await request(app).put("/links/" + link.id)
        .send({
          code: "foobaraaaaa",
          fullurl: "https://fullbar.com",
        })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.be.equal(200);
      expect(response.body.data).to.have.a.property("redirectpath");
      expect(response.body.data.redirectpath).to.be.equal("/go/foobaraaaaa");
    });
  });

  describe("DELETE /:linkId", () => {
    it("remove um link", async () => {
      const link = await db.models.Link.create({
        code: "foobar",
        fullurl: "https://fullbar.com",
        userId: user.id,
      });

      const response = await request(app).delete("/links/" + link.id)
        .set("Authorization", `Bearer ${token}`);

      const count = await db.models.Link.count({
        where: {
          code: "foobar",
        }
      });

      expect(count).to.be.equal(0);
    });
  });
});