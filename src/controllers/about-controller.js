export const aboutController = {
  index: {
    auth: false,
    handler: function (request, h) {
      const viewData = {
        title: "About Placemark",
      };
      return h.view("about-view", viewData);
    },
  },
};