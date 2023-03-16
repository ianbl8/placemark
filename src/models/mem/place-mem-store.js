import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle
import { categoryMemStore } from "./category-mem-store.js";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(categoryId, place) {
    const category = await categoryMemStore.getCategoryById(categoryId);
    place._id = v4();
    place.categoryid = category._id;
    place.categorytitle = category.title;
    places.push(place);
    return place;
  },

  async getPlacesByCategoryId(categoryId) {
    return places.filter((place) => place.categoryid === categoryId);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async deletePlaceById(id) {
    const index = places.findIndex((place) => place._id === id);
    places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },

  async updatePlace(place, updatedPlace) {
    place.placename = updatedPlace.placename;
    place.longitude = updatedPlace.longitude;
    place.latitude = updatedPlace.latitude;
    place.description = updatedPlace.description;
     /*
    Possible updating of category, eg change from one to another:
    List categories in a drop-down box for selection if updating?
    
    const category = await categoryMemStore.getCategoryByTitle(updatedPlace.categorytitle);
    place.categoryid = category._id;
    place.categorytitle = category.title;
    */
  },
};