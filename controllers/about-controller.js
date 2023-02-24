export const aboutController = {
  index(request, response) {
    console.log("about rendering");
    const viewData = {
      title: "About Todo",
    };
    response.render("about-view", viewData);
  },
};
