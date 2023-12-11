const User = require("../models/user-model");
// const cryptoRandomString = require('crypto-random-string');
const { v4: uuidv4 } = require('uuid');



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
        console.log("here obj", userData);

        const user = new User(userData);

        // Sauvegarder l'utilisateur dans la base de données
        await user.save();
        // sendActivationEmail(user.email, activationToken); 
        // console.log(user.email, activationToken);
        res.status(201).json({ message: 'Email sent, please choose your password' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

function sendActivationEmail(email, activationToken) {

    
}


