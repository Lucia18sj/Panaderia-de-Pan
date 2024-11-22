const homeController = {};

homeController.getHome = async (req, res) => {
    res.render('../src/views/MiCuenta.ejs');
};

export default homeController;
