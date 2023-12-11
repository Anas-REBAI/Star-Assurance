// const User = require("../models/user-model");
// const nodemailer = require("nodemailer");
// // const cryptoRandomString = require('crypto-random-string');
// const { v4: uuidv4 } = require('uuid');



// module.exports.sendEmail = async (req, res) => {
//     try {
//         const userEmail = await User.findOne({ email: req.body.email });
//         if (userEmail) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         const activationToken = uuidv4();
//         const userData = {
//             ...req.body,
//             activationToken: activationToken,
//         };
//         console.log("here obj", userData);

//         const user = new User(userData);

//         // Sauvegarder l'utilisateur dans la base de données
//         await user.save();
//         sendActivationEmail(user.email, activationToken, user.firstName);
//         // console.log(user.email, activationToken);
//         res.status(201).json({ message: 'Email sent, please choose your password' });

//     } catch (error) {
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//         user: "mekrazikilanii@gmail.com",
//         pass: "Maak98765",
//     },
// });

// function sendActivationEmail(email, activationToken, name) {
//     // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
//     transporter
//         .sendMail({
//             from: user,
//             to: email,
//             subject: "Veuillez activer votre compte ",
//             html: `
//             <div>
//             <h1>Activation du compte</h1>
//             <h2>Bonjour ${name}</h2>
//             <p>Veuillez confirmer votre email en cliquant sur le lien suivant:</p>
//             <a href="http://localhost:4200/createPassword/${activationToken}">Cliquez ici pour confirmer</a>
//         </div>`,
//         })
//         .catch((err) => console.log(err));
// };





const User = require("../models/user-model");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

// Création d'un objet de transporteur (transporter) pour les e-mails sortants
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // Authentification pour votre compte Gmail (remplacer avec vos identifiants)
        user: "mekrazikilanii@gmail.com",
        pass: "Maak98765",
    },
});

// Fonction pour envoyer l'e-mail d'activation
function sendActivationEmail(email, activationToken, name) {
    // Envoi du courriel à l'utilisateur avec les détails fournis
    transporter.sendMail({
        from: "VOTRE-ADRESSE@GMAIL.COM", // Adresse expéditeur
        to: email, // Adresse destinataire
        subject: "Veuillez activer votre compte", // Sujet de l'e-mail
        html: `
            <div>
                <h1>Activation du compte</h1>
                <h2>Bonjour ${name}</h2>
                <p>Veuillez confirmer votre email en cliquant sur le lien suivant:</p>
                <a href="http://localhost:4200/createPassword/${activationToken}">Cliquez ici pour confirmer</a>
            </div>`
    })
        .catch((err) => console.log(err)); // Gérer les erreurs d'envoi d'e-mail
}

// Fonction pour envoyer l'e-mail d'activation après enregistrement de l'utilisateur
module.exports.sendEmail = async (req, res) => {
    try {
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const activationToken = uuidv4();
        const userData = {
            ...req.body,
            activationToken: activationToken,
        };

        const user = new User(userData);

        // Sauvegarder l'utilisateur dans la base de données
        await user.save();

        // Appel de la fonction pour envoyer l'e-mail d'activation
        sendActivationEmail(user.email, activationToken, user.firstName);

        res.status(201).json({ message: 'Email sent, please choose your password' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


