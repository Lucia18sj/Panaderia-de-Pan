const homeController = {};

homeController.getHome = async (req, res) => {
    res.render('../src/views/MiCuenta.ejs');
};

homeController.login = async (req, res) => {
    res.render('../src/views/login.ejs');
};
homeController.register = async (req, res) => {
    res.render('../src/views/register.ejs');
};




export default homeController;
