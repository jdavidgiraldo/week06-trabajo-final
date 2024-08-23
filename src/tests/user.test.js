const request = require("supertest")
const app = require("../app")
const supertest = require("supertest")

const BASE_URL = "/api/v1/users"
let TOKEN
// let TOKEN_2
let userId

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
  const res = await request(app).post(BASE_URL).send(user)

  userId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  columns.forEach((column) => {
    expect(res.body[column]).toBe(user[column])
  })
  // expect(res.body.firstName).toBe(user.firstName)
})

//GETALL
test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set("Authorization", `Bearer ${TOKEN}`)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(2)
})

//LOGIN->LOGIN
test("POST -> 'BASE_URL/LOGIN', should return statusCode 200, and res.body.user.email === hits.email", async () => {
  const hits = {
    email: user.email,
    password: user.password,
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(hits)
  // console.log(res.body)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user).toBeDefined()
  expect(res.body.token).toBeDefined()
  expect(res.body.user.email).toBe(hits.email)
})

//LOGIN -> error
test("POST -> 'BASE_URL/LOGIN', should return statusCode 401", async () => {
  const hits = {
    email: "maria@gmail.com",
    password: "invalidpassword",
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(hits)

  // console.log(res.body)

  expect(res.statusCode).toBe(401)
})

//PUT
test("PUT -> 'BASE_URL/:ID', should return statusCode 200, and res.body.firstName === userUpdate", async () => {
  const userUpdate = {
    firstName: "John",
  }

  const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(userUpdate.firstName)
})

//delete
test("DELETE -> 'BASE_URL/:ID', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)
})
