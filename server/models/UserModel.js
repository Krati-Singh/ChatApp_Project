import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false, 
    },
    profileSetup: {
        type: Boolean,
        default: false,
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

const User = mongoose.model("Users", userSchema);
export default User;