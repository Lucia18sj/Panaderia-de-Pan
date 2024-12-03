const homeController = {};

homeController.getHome = async (req, res) => {
    res.render('Home');
};

homeController.login = async (req, res) => {
    res.render('login');
};

homeController.register = async (req, res) => {
    res.render('Register');
};

homeController.myAccount = async (req, res) => {
    res.render('MiCuenta');
};

homeController.carrito = async (req, res) => {
    res.render('car');
};
export default homeController;
