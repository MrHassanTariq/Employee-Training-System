import axios from "axios";

export const register = newUser => {
  return axios
    .post("users/register", {
      email: newUser.email,
      name: newUser.name,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    });
};
