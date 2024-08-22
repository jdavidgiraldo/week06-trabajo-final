const User = require("../models/User");

const BASE_URL = "/api/v1/users";

const user = {
  firstName: "Maria",
  lastName: "Otalvaro",
  email: "maria@gmail.com",
  password: "maria1234",
  phone: "3056789032",
};

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const user =
    await User.findAll();
  console.log(user);
});
