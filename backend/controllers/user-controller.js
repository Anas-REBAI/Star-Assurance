const User = require("../models/user-model");
const nodemailer = require("nodemailer");
// const cryptoRandomString = require('crypto-random-string');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

// Création d'un objet de transporteur (transporter) pour les e-mails sortants
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // Authentification pour votre compte Gmail (remplacer avec vos identifiants)
        user: "mekrazikilanii@gmail.com",
        pass: "trfb lbng oflk yoks",
    },
});

// Fonction pour envoyer l'e-mail d'activation
function sendEmail(email, activationToken, name) {
    // Envoi du courriel à l'utilisateur avec les détails fournis
    transporter.sendMail({
        from: "mekrazikilanii@gmail.com", // Adresse expéditeur
        to: email, // Adresse destinataire
        subject: "Veuillez activer votre compte", // Sujet de l'e-mail
        html: `
            <div>
                <h1>Activation du compte</h1>
                <h2>Bonjour ${name}</h2>
                <p>Veuillez ajouter votre mot de passe en cliquant sur le lien suivant:</p>
                <a href="http://localhost:4200/createPassword/${activationToken}">Cliquez ici pour confirmer</a>
            </div>`
    })
        .catch((err) => console.log(err)); // Gérer les erreurs d'envoi d'e-mail
}

// Fonction pour envoyer l'e-mail d'activation après enregistrement de l'utilisateur
module.exports.signup = async (req, res) => {
    try {
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        if (!req.body.activationToken) {
            const activationToken = uuidv4();
            const userData = {
                ...req.body,
                activationToken: activationToken,
            };
            const user = new User(userData);
            // Appel de la fonction pour envoyer l'e-mail d'activation
            sendEmail(user.email, activationToken, user.firstName);
            // Sauvegarder l'utilisateur dans la base de données
            await user.save();
            res.status(201).json({ message: 'Email sent, please choose your password' });
        } else {
            const userFind = await User.findOne({ activationToken: req.body.activationToken });
            if (userFind.pwd == "") {
                const hashedPwd = await bcrypt.hash(req.body.pwd, 10);
                userFind.pwd = hashedPwd;
                await userFind.save();
                return res.status(200).json({ message: 'Password set successfully' });
            } else {
                return res.status(400).json({ error: 'User already active' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


