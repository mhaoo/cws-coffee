export default {
  routes: [
    {
      method: "GET",
      path: "/categories/:slug",
      handler: "category.findOne",
      config: {
        auth: {
          enabled: false,
        },
      },
    },
  ],
};
