import axios from "axios";
// import Constants from "../utilities/Constants";
import backend from "../backend/backend.tsx";

// const API_URL = Constants.API_URL_GET_ALL_WAREHOUSES;
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post("http://localhost:5004/api/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(localStorage);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post("http://localhost:5004/api/register", {
      username,
      email,
      password,
    });
  }
  registerManager(username, email, password) {
    return backend.post("http://localhost:5004/api/register/manager", {
      username,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
