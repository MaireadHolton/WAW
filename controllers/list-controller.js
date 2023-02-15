import { db } from "../models/db.js";

export const listController = {
  index: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      const viewData = {
        title: "List",
        list: list,
      };
      return h.view("list-view", viewData);
    },
  },

  addLocation: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      const newLocation = {
        location: request.payload.location,
        date: request.payload.date,
        details: request.payload.details,
        pictures: request.payload.pictures,
      };
      await db.locationStore.addLocation(list._id, newLocation);
      return h.redirect(`/list/${list._id}`);
    },
  },

  deleteLocation: {
    handler: async function(request, h) {
      const list = await db.listStore.getListById(request.params.id);
      await db.locationStore.deleteLocation(request.params.locationid);
      return h.redirect(`/list/${list._id}`);
    },
  },
};
