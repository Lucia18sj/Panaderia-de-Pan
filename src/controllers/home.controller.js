const homeController = {};

homeController.getHome = async (req, res) => {
    res.render('../src/views/home.ejs');
};

export default homeController;
