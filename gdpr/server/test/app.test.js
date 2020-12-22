const app = require("../app");
const request = require("supertest");

describe("/", () => {
  it("test that api is running", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("/api/all", () => {
  it("should get all data", async () => {
    const res = await request(app).get("/api/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(5);
    expect(res.body[0].country).toEqual("Germany");
  });
});

describe("/api/all/:id", () => {
  it("should return a specific data that match the id", async () => {
    const getALL = await request(app).get("/api/all");
    const { id } = getALL.body[0];
    const res = await request(app).get(`/api/all/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(id);
  });
});

describe("/api/add-fines", () => {
  it("add a new fine", async () => {
    const res = await request(app).post("/api/add-fines").send({
      country: "UK",
      amount: "2000",
      currency: "£",
      company: "o2",
      description: "simple text for description test",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date");
  });
  it("check the all data to have the new posted data", async () => {
    const res = await request(app).get("/api/all");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(6);
    expect(res.body[res.body.length - 1].country).toEqual("UK");
  });
  describe("/api/delete/:id", () => {
    it("should delete specific data that matches the id", async () => {
      const getAll = await request(app).get("/api/all");
      const { id } = getAll.body[0];

      const deleteData = await request(app).delete(`/api/delete/${id}`);
      expect(deleteData.statusCode).toEqual(200);
      const newData = await request(app).get("/api/all");
      expect(newData.body.length).not.toEqual(getAll.body.length);
    });
  });
});
