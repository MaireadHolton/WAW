//import { userMemStore } from "./mem/user-mem-store.js";
//import { listMemStore } from "./mem/list-mem-store.js";
//import { locationMemStore } from "./mem/location-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { listJsonStore } from "./json/list-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";

export const db = {
  userStore: null,
  listStore: null,
  locationStore: null,

  init() {
    this.userStore = userJsonStore;
    this.listStore = listJsonStore;
    this.locationStore = locationJsonStore;
  },
};


