import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, FarmSpec, FarmSpecPlus, FarmArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const farmApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const farms = await db.farmStore.getAllFarms();
        return farms;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: FarmArraySpec, failAction: validationError },
    description: "Get all farms",
    notes: "Returns all farms",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const farm = await db.farmStore.getFarmById(request.params.id);
        if (!farm) {
          return Boom.notFound("No farm with this id");
        }
        return farm;
      } catch (err) {
        return Boom.serverUnavailable("No farm with this id");
      }
    },
    tags: ["api"],
    description: "Find a Farm",
    notes: "Returns a farm",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: FarmSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const farm = await db.farmStore.addFarm(request.params.id, request.payload);
        if (farm) {
          return h.response(farm).code(201);
        }
        return Boom.badImplementation("error creating farm");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a farm",
    notes: "Returns the newly created farm",
    validate: { payload: FarmSpec },
    response: { schema: FarmSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.farmStore.deleteAllFarms();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all farmApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const farm = await db.farmStore.getFarmById(request.params.id);
        if (!farm) {
          return Boom.notFound("No Farm with this id");
        }
        await db.farmStore.deleteFarm(farm._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Farm with this id");
      }
    },
    tags: ["api"],
    description: "Delete a farm",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};