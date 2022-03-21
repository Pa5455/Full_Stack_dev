import { db } from "../models/db.js";

export const placemarkController = {
  index: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      return h.view("placemark-view", viewData);
    },
  },


  addFarm: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newFarm = {
        farmername: request.payload.farmername,
        address: request.payload.address,
        enterprise: request.payload.enterprise,
      };
      await db.farmStore.addFarm(placemark._id, newFarm);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};