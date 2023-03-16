import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        user: loggedInUser,
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addPlace: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const newPlace = {
        userid: loggedInUser._id,
        placename: request.payload.placename,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        description: request.payload.description,
      };
      await db.placeStore.addPlace(category._id, newPlace);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deletePlace: {
    handler: async function(request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.placeStore.deletePlaceById(request.params.placeid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};