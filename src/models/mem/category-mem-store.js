import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle
import { placeMemStore } from "./place-mem-store.js";

let categories = [];

export const categoryMemStore = {
  async getAllCategories() {
    return categories;
  },

  async getCategoriesByUser(userid) {
    return categories.filter((category) => category.userid === userid);
  },

  async addCategory(category) {
    category._id = v4();
    categories.push(category);
    return category;
  },

  async getCategoryById(id) {
    const list = categories.find((category) => category._id === id);
    list.places = await placeMemStore.getPlacesByCategoryId(list._id);
    return list;
  },

  async getCategoryByTitle(title) {
    const list = categories.find((category) => category.title === title);
    list.places = await placeMemStore.getPlacesByCategoryId(list._id);
    return list;
  },

  async deleteCategoryById(id) {
    const index = categories.findIndex((category) => category._id === id);
    categories.splice(index, 1);
  },

  async deleteAllCategories() {
    categories = [];
  },

  async updateCategory(category, updatedCategory) {
    category.title = updatedCategory.title;
    /*
    Also need to call placeMemStore.updatePlace()
    to update place.categorytitle (only)
    for each place in this category
    */
  },
};