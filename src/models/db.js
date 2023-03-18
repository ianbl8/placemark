// MemStores
// import { userMemStore } from "./mem/user-mem-store.js";
// import { categoryMemStore } from "./mem/category-mem-store.js";
// import { placeMemStore } from "./mem/place-mem-store.js";

// JsonStores
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  placeStore: null,

  init() {
    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore;
    this.placeStore = placeJsonStore;
  },
};