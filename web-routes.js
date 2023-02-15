import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { listController } from "./controllers/list-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/list/{id}", config: listController.index },
  { method: "GET", path: "/dashboard/deletelist/{id}", config: dashboardController.deleteList },
  { method: "GET", path: "/list/{id}/deletelocation/{locationid}", config: listController.deleteLocation },
  { method: "POST", path: "/list/{id}/addlocation", config: listController.addLocation },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addlist", config: dashboardController.addList },
];
