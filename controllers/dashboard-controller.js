import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const lists = await db.listStore.getUserLists(loggedInUser._id);
      const viewData = {
        title: "myWildAtlanticWay Dashboard",
        user: loggedInUser,
        lists: lists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addList: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.listStore.addList(newList);
      return h.redirect("/dashboard");
    },
  },

  deleteList: {
    handler: async function (request, h) {
      const list = await db.listStore.getListById(request.params.id);
      await db.listStore.deleteListById(list._id);
      return h.redirect("/dashboard");
    },
  },
};
