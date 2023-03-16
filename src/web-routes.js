import { aboutController } from "./controllers/about-controller.js";
import { accountController } from "./controllers/account-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountController.index },
  { method: "GET", path: "/signup", config: accountController.showSignup },
  { method: "GET", path: "/login", config: accountController.showLogin },
  { method: "GET", path: "/logout", config: accountController.logout },
  { method: "POST", path: "/register", config: accountController.signup },
  { method: "POST", path: "/authenticate", config: accountController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcategory", config: dashboardController.addCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "POST", path: "/category/{id}/addplace", config: categoryController.addPlace },
];