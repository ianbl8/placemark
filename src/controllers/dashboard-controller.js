import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getCategoriesByUser(loggedInUser._id);
      const viewData = {
        title: "PlaceMark Dashboard",
        user: loggedInUser,
        categories: categories,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCategory = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.categoryStore.deleteCategoryById(category._id);
      return h.redirect("/dashboard");
    },
  },

  editCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Edit Category",
        user: loggedInUser,
        category: category,
      };
      return h.view("category-edit", viewData);
    },
  },

  updateCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      let newCategory = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.categoryStore.updateCategory(category, newCategory);
      newCategory = await db.categoryStore.getCategoryById(request.params.id);
      for (let i = 0; i < category.places.length; i += 1) {
        newCategory.places[i].categorytitle = request.payload.title;
        // eslint-disable-next-line no-await-in-loop
        await db.placeStore.updatePlace(category.places[i], newCategory.places[i]);
      }
      console.log(newCategory);
      return h.redirect("/dashboard");
    },
  },
};
