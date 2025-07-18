import request from "supertest";
import express from "express";
import synonymRouter from "../../src/routes/synonym";
import { describe, test, expect } from "@jest/globals";

const app = express();
app.use(express.json());
app.use("/api/synonyms", synonymRouter);

describe("Synonym API", () => {
  test("POST /api/synonyms normalizes input and stores synonyms", async () => {
    const res = await request(app)
      .post("/api/synonyms")
      .send({ word: "  Clean  ", synonyms: ["  Wash", " TIDY "] });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Word and synonyms added successfully");
  });

  test("GET /api/synonyms/:word returns normalized synonyms", async () => {
    const res = await request(app).get("/api/synonyms/clean");

    expect(res.status).toBe(200);
    expect(res.body.synonyms.sort()).toEqual(["wash", "tidy"].sort());
  });

  test("GET /api/synonyms/:word is case insensitive and trims spaces", async () => {
    const res = await request(app).get("/api/synonyms/  WASH  ");

    expect(res.status).toBe(200);
    expect(res.body.synonyms.sort()).toEqual(["clean", "tidy"].sort());
  });

  test("GET unknown word returns empty array", async () => {
    const res = await request(app).get("/api/synonyms/unknownword");

    expect(res.status).toBe(200);
    expect(res.body.synonyms).toEqual([]);
  });
  test("POST /api/synonyms returns 400 when payload invalid", async () => {
    const res1 = await request(app)
      .post("/api/synonyms")
      .send({ word: "", synonyms: ["test"] });
    expect(res1.status).toBe(400);

    const res2 = await request(app)
      .post("/api/synonyms")
      .send({ word: "test" });
    expect(res2.status).toBe(400);

    const res3 = await request(app)
      .post("/api/synonyms")
      .send({ word: "test", synonyms: "notarray" });
    expect(res3.status).toBe(400);
  });
});
