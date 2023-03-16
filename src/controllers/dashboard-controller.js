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
};
