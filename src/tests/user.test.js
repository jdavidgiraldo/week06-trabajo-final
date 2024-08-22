const request = require("supertest")
const app = require("../app")

const BASE_URL = "/api/v1/users"

const user = {
  firstName: "Maria",
  lastName: "Otalvaro",
  email: "maria@gmail.com",
  password: "maria1234",
  phone: "3056789032",
}

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(user)

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})
