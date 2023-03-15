import { v4 } from "uuid";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(categoryId, place) {
    place._id = v4();
    place.categoryid = categoryId;
    places.push(place);
    return place;
  },

  async getPlacesByCategoryId(id) {
    return places.filter((place) => place.categoryid === id);
  },

  async getPlaceById(id) {
    return places.find((place) => place._id === id);
  },

  async getCategoryPlaces(categoryId) {
    return places.filter((place) => place.categoryid === categoryId);
  },

  async deletePlace(id) {
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
    place.dsecription = updatedPlace.description;
  },
};