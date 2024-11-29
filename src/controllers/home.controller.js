const homeController = {};

homeController.getHome = async (req, res) => {
    res.render('../src/views/home.ejs');
};

homeController.login = async (req, res) => {
    res.render('../src/views/login.ejs');
};
homeController.register = async (req, res) => {
    res.render('../src/views/register.ejs');
};
homeController.myAccount = async (req, res) => {
    res.render('../src/views/MiCuenta.ejs');
};




export default homeController;
