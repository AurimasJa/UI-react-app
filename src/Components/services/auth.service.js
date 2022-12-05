// import Constants from "../utilities/Constants";
import backend from "../backend/backend.tsx";
import axios from "axios";
// import axios from "axios";
// const API_URL = Constants.API_URL_GET_ALL_WAREHOUSES;
// const API_URL = "https://myapiwarehouse.azurewebsites.net/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post("https://myapiwarehouse.azurewebsites.net/api/login", {
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
    return axios.post("https://myapiwarehouse.azurewebsites.net/api/register", {
      username,
      email,
      password,
    });
  }
  registerManager(username, email, password) {
    return backend.post(
      "https://myapiwarehouse.azurewebsites.net/api/register/manager",
      {
        username,
        email,
        password,
      }
    );
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
