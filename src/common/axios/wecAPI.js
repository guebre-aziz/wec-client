import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "/api/v1";

export default axios.create({
  baseURL: "/api/v1",
});
