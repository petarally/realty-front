import axios from "axios";

let Service = axios.create({
  baseURL: "https://istrian-villa.com/api/",
});

Service.interceptors.request.use((request) => {
  let token = Auth.getToken();
  request.headers["Authorization"] = "Bearer " + token;
  return request;
});

let Auth = {
  async login(email, password) {
    let reponse = await Service.post("/authuser", {
      email: email,
      password: password,
    });
    let user = reponse.data;
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken() {
    let user = Auth.getUser();
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },
  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

export { Auth, Service };
