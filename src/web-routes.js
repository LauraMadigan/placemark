import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { collectionController } from "./controllers/collection-controller.js";
import { userProfileController } from "./controllers/user-profile-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/about", config: accountsController.about },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcollection", config: dashboardController.addCollection },
  { method: "GET", path: "/collection/{id}", config: collectionController.index },
  { method: "POST", path: "/collection/{id}/addplacemark", config: collectionController.addPlacemark },
  { method: "GET", path: "/collection/{collectionId}/removePlacemark/{placemarkId}", config: collectionController.removePlacemark },
  { method: "GET", path: "/dashboard/deletecollection/{id}", config: dashboardController.deleteCollection },
  { method: "GET", path: "/profile", config: userProfileController.profile },
  { method: "GET", path: "/profile/delete", config: userProfileController.deleteUser },
  { method: "POST", path: "/profile/update", config: userProfileController.updateUser }
];
