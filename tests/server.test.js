require("dotenv").config();
const mongoose = require("mongoose");
const createServer = require("../server");
const supertest = require("supertest");

const Gateway = require("../models/Gateway");

beforeEach((done) => {
  mongoose.connect(
    process.env.DATABASE_DEV_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();

test("GET /gateways", async () => {
  const gateway = await Gateway.create({
    serial_number: "2689",
    name: "gateway1",
    ipv4_address: "1.1.1.1",
  });

  await supertest(app)
    .get("/gateways")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body.data)).toBeTruthy();
      expect(response.body.data.length).toEqual(1);
      expect(response.body.data[0]._id).toBe(gateway.id);
      expect(response.body.data[0].serial_number).toBe(gateway.serial_number);
      expect(response.body.data[0].name).toBe(gateway.name);
      expect(response.body.data[0].ipv4_address).toBe(gateway.ipv4_address);
    });
});

test("GET /gateways/:id", async () => {
  const gateway = await Gateway.create({
    serial_number: "2689",
    name: "gateway1",
    ipv4_address: "1.1.1.1",
  });

  await supertest(app)
    .get("/gateways/" + gateway.id)
    .expect(200)
    .then((response) => {
      expect(response.body.data._id).toBe(gateway.id);
      expect(response.body.data.serial_number).toBe(gateway.serial_number);
      expect(response.body.data.name).toBe(gateway.name);
      expect(response.body.data.ipv4_address).toBe(gateway.ipv4_address);
    });
});

test("POST /gateways", async () => {
  const gateway = {
    serial_number: "2689",
    name: "gateway1",
    ipv4_address: "1.1.1.1",
  };

  await supertest(app)
    .post("/gateways")
    .send(gateway)
    .expect(200)
    .then(async (response) => {
      expect(response.body.data._id).toBeTruthy();
      expect(response.body.data.serial_number).toBe(gateway.serial_number);
      expect(response.body.data.name).toBe(gateway.name);
      expect(response.body.data.ipv4_address).toBe(gateway.ipv4_address);

      const get_gateway = await Gateway.findOne({
        _id: response.body.data._id,
      });

      expect(get_gateway).toBeTruthy();
      expect(get_gateway.serial_number).toBe(gateway.serial_number);
      expect(get_gateway.ipv4_address).toBe(gateway.ipv4_address);
    });
});

test("DELETE /gateways/:id", async () => {
  const gateway = await Gateway.create({
    serial_number: "2689",
    name: "gateway1",
    ipv4_address: "1.1.1.1",
  });

  await supertest(app)
    .delete("/gateways/" + gateway.id)
    .expect(200)
    .then(async () => {
      expect(await Gateway.findOne({ _id: gateway.id })).toBeFalsy();
    });
});
