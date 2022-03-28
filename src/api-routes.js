import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { farmApi } from "./api/farm-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "GET", path: "/api/placemarks", config: placemarkApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne },
  
  { method: "GET", path: "/api/farms", config: farmApi.find },
  { method: "GET", path: "/api/farms/{id}", config: farmApi.findOne },
  { method: "POST", path: "/api/placemarks/{id}/farms", config: farmApi.create },
  { method: "DELETE", path: "/api/farms", config: farmApi.deleteAll },
  { method: "DELETE", path: "/api/farms/{id}", config: farmApi.deleteOne },

 

];