// import other routes
const priceRoutes = require("./prices");
const userRoutes = require("./users");
const clientRoutes = require("./clients");
const commandeRoutes = require("./commandes");
const conditionsVenteRoutes = require("./conditionsVente");
const gestionCompteRoutes = require("./gestionComptes");
const gestionCoutRoutes = require("./gestionCouts");
const marcheRoutes = require("./marches");
const rhFinanceRoutes = require("./rhFinances");
const tvaRoutes = require("./tvas");

const appRouter = (app, fs) => {
  // default route
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  // // other routes
  userRoutes(app, fs);
  priceRoutes(app, fs);
  clientRoutes(app, fs);
  commandeRoutes(app, fs);
  conditionsVenteRoutes(app, fs);
  gestionCompteRoutes(app, fs);
  gestionCoutRoutes(app, fs);
  marcheRoutes(app, fs);
  rhFinanceRoutes(app, fs);
  tvaRoutes(app, fs);
};

module.exports = appRouter;
