import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3232/",
});

Service.interceptors.request.use((request) => {
  let token = Auth.getToken();
  if (token) {
    request.headers["Authorization"] = "Bearer " + token;
  }
  return request;
});

let Auth = {
  async login(email, password) {
    try {
      console.log("Sending login request with email:", email); // Dodaj logiranje za email
      let response = await Service.post("auth/login", {
        email: email,
        password: password,
      });
      console.log("Login response:", response); // Provjeri cijeli odgovor
      let user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      console.error("Login failed:", error.response); // Ispravno logiranje greške
      if (error.response) {
        console.log("Error message:", error.response.data.error); // Dodatni ispis poruke greške
      }
      return false;
    }
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
