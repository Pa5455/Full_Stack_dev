// import { userMemStore } from "./mem/user-mem-store.js";
// import { placemarkMemStore } from "./mem/placemark-mem-store.js";
// import { farmMemStore } from "./mem/farm-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { farmJsonStore } from "./json/farm-json-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  farmStore: null,

  init() {
    this.userStore = userJsonStore;
    this.placemarkStore = placemarkJsonStore;
    this.farmStore = farmJsonStore;
  },
};