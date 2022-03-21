import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { farmMemStore } from "./mem/farm-mem-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  farmStore: null,

  init() {
    this.userStore = userMemStore;
    this.placemarkStore = placemarkMemStore;
    this.farmStore = farmMemStore;
  },
};