import { db } from "../models/db.js";

export const userProfileController = {
  profile: {
    handler: async function (request, h) {
      const userEmail = request.auth.credentials.email;
      const user = await db.userStore.getUserByEmail(userEmail); // get user with their email address
      const viewData = {
        title: "Profile",
        user: user
      };
      return h.view("user-profile-view", viewData);
    }
  },

  updateUser: {
    handler: async function (request, h) {
      const userEmail = request.auth.credentials.email;
      const user = await db.userStore.getUserByEmail(userEmail); // get user with their email address

      user.firstName = request.payload.firstName;
      user.lastName = request.payload.lastName;
      user.email = request.payload.email;

      // request.cookieAuth.set({ id: user._id });

      // Password update handling
      if (
        (request.payload.password === "" && request.payload.passwordConfirmation == "") || // if password or confirmation is either blank, or don't match
        (request.payload.password !== request.payload.passwordConfirmation)
      ) {
        console.log("Not updating Password!");
      } else {
        // Update the user password
        user.password = request.payload.password;
      }

      db.userStore.updateUser(user);

      const viewData = {
        title: "Profile",
        user: user,
        success: true
      };
      return h.view("user-profile-view", viewData);
    }
  },

  deleteUser: {
    handler: async function (request, h) {
      const userEmail = request.auth.credentials.email;
      const user = await db.userStore.getUserByEmail(userEmail); // get user with their email address
      // stationStore.deleteStationsForUser(user._id); // TODO: Delete all of the user collections/placemarks
      db.userStore.deleteUserById(user._id); // Delete the user
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  }

};

