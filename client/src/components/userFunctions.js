import axios from "axios";

// export const register = newUser => {
//   return axios
//     .post("http://localhost:9000/users/register", {
//       email: newUser.email,
//       name: newUser.name,
//       password: newUser.password,
//       roleId: newUser.roleId
//     })
//     .then(res => console.log(res.data));
// };

export const register = newUser => {
  return axios({
    method: "post",
    url: "http://localhost:9000/users/register",
    data: {
      email: newUser.email,
      name: newUser.name,
      password: newUser.password,
      roleId: newUser.roleId
    },
    validateStatus: status => {
      return true; // I'm always returning true, you may want to do it depending on the status received
    }
  })
    .catch(error => {})
    .then(response => {
      console.log(response);
    });
};
