import User from "../models/user.js";
import cryptoRandomString from 'crypto-random-string';

export async function sendEmail(req, res) {
    try {
        const userEmail = await User.findOne({ email: req.body.email });
        if (userEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const activationToken = cryptoRandomString({ length: 20, type: 'url-safe' });
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            tel: req.body.tel,
            activationToken: activationToken,
        });
        // Sauvegarder l'utilisateur dans la base de données
        user.save((err, savedUser) => {
            if (err) {
                return res.status(400).json({ error: 'Error creating user' });
            }
            sendActivationEmail(savedUser.email, activationToken); // Supposons une fonction pour envoyer l'email
            res.status(201).json({ message: 'Email sent, please choose your password' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
 

