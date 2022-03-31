import { db } from "../models/db.js";
import { FarmSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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

  uploadImage: {
    handler: async function(request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          placemark.img = url;
          db.placemarkStore.updatePlacemark(placemark);
        }
        return h.redirect(`/placemark/${placemark._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/placemark/${placemark._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },


  addFarm: {
    validate: {
      payload: FarmSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("placemark-view", { title: "Add farm error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      const newFarm = {
        farmername: request.payload.farmername,
        address: request.payload.address,
        enterprise:request.payload.enterprise,
      };
      await db.farmStore.addFarm(placemark._id, newFarm);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  deleteFarm: {
    handler: async function(request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.farmStore.deleteFarm(request.params.farmid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },

  
};