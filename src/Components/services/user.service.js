import axios from "axios";
import authHeader from "./auth-header";

import Constants from "../utilities/Constants";

const API_URL = Constants.API_URL_GET_ALL_WAREHOUSES;
// const API_URL = "http://localhost:8080/api/test/";

class UserService {
  getPublicContent() {
    return axios.get(Constants.API_URL_GET_ALL_WAREHOUSES);
  }
}

export default new UserService();
