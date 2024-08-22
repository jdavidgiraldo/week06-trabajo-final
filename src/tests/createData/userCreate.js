const User = require("../../models/User");

const userCreate = async () => {
  const user = {
    firstName: "Juan",
    lastName: "Bueno",
    email: "juanbueno@gmail.com",
    password: "juan1234",
    phone: "3056789012",
  };

  await User.create(user);
};

module.exports = userCreate;
