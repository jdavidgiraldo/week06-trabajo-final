const request = require("supertest")
const app = require("../app")
const supertest = require("supertest")

const BASE_URL = "/api/v1/users"
let TOKEN

beforeAll(async () => {
  const user = {
    email: "juanbueno@gmail.com",
    password: "juan1234",
  }
  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

  TOKEN = res.body.token
  // console.log(TOKEN)
})

const user = {
  firstName: "Maria",
  lastName: "Otalvaro",
  email: "maria@gmail.com",
  password: "maria1234",
  phone: "3056789032",
}

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const columns = [
    "firstName",
    "lastName",
    // "password",
    "email",
    "phone",
  ]
  const res = await request(app)
    .post(BASE_URL)
    .send(user)

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  columns.forEach((column) => {
    expect(res.body[column]).toBe(user[column])
  })
  // expect(res.body.firstName).toBe(user.firstName)
})

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(2)
})
