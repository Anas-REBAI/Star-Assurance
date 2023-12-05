// import du module mongoose
import mongoose from "mongoose";
// import du module mongoose-unique-validator
import uniqueValidator from "mongoose-unique-validator";

// Création du schéma User
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    pwd: String,
    tel: { type: String, unique: true },
    activationToken: String,
});

// Utilisation du plugin mongoose-unique-validator
userSchema.plugin(uniqueValidator);

// Création du modèle User à partir du schéma
const User = mongoose.model("User", userSchema);

// Export du modèle User
export default User;
