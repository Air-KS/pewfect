const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const helmet = require('helmet');
const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const apirouter = require('./api/apirouter').router;
const errorHandler = require('./config/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Configurer Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sécuriser les en-têtes HTTP
app.use(helmet());
app.use(helmet({
  xssFilter: false,
  frameguard: false // Désactiver X-Frame-Options
}));

// Définir Content-Security-Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  next();
});

// Désactiver la mise en cache des réponses dynamiques
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Parser les corps de requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Activer CORS
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Logger les requêtes
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});

// Utiliser le routeur API
app.use("/api", apirouter);
app.use(errorHandler);

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
