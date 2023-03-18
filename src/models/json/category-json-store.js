import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { Low } from "lowdb";
// eslint-disable-next-line import/no-unresolved
import { JSONFile } from "lowdb/node";
// eslint-disable-next-line import/no-cycle
import { placeJsonStore } from "./place-json-store.js";

const db = new Low(new JSONFile("./src/models/json/categories.json"));
db.data = { categories: [] };

export const categoryJsonStore = {
  async getAllCategories() {
    await db.read();
    return db.data.categories;
  },

  async getCategoriesByUser(userid) {
    await db.read();
    return db.data.categories.filter((category) => category.userid === userid);
  },

  async addCategory(category) {
    await db.read();
    category._id = v4();
    db.data.categories.push(category);
    await db.write();
    return category;
  },

  async getCategoryById(id) {
    await db.read();
    const list = db.data.categories.find((category) => category._id === id);
    list.places = await placeJsonStore.getPlacesByCategoryId(list._id);
    return list;
  },

  async getCategoryByTitle(title) {
    await db.read();
    const list = db.data.categories.find((category) => category.title === title);
    list.places = await placeJsonStore.getPlacesByCategoryId(list._id);
    return list;
  },

  async deleteCategoryById(id) {
    await db.read();
    const index = db.data.categories.findIndex((category) => category._id === id);
    db.data.categories.splice(index, 1);
    await db.write();
  },

  async deleteAllCategories() {
    db.data.categories = [];
    await db.write();
  },

  async updateCategory(category, updatedCategory) {
    category.title = updatedCategory.title;
    await db.write();
  },
};