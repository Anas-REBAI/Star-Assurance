// import "express" module
const express = require('express');
// import "body-parser" module
const bodyParser = require('body-parser');
// import "mongoose" module
const mongoose = require('mongoose');
// import "routes"
const userRouter = require('./backend/routes/user-route');
// import "cors"
const cors = require('cors');
// creates express application (app)
const app = express();

// Utilisation de body-parser pour analyser les requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// Définition des routes pour les utilisateurs
app.use('/api/users', userRouter);

// Configuration des en-têtes de sécurité CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// Configuration du port
const port = process.env.PORT || 3000;

// Configuration de la base de données
const databaseName = 'assurance';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017/${databaseName}`;

// Connexion à la base de données MongoDB
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${databaseName}`);
    // Démarrage du serveur une fois la connexion établie
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
    // Arrêt du processus en cas d'échec de la connexion à la base de données
    process.exit(1);
  });