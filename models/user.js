import mongoose from "mongoose";
import validator from 'validator';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file into process.env

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 100,
    },
    email: {
        type: String,
        index: { unique: true },
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
  }
);

// Method to generate authentication token for the user
UserSchema.methods.authToken = async function () {
    const user = this;
    const token = jwt.sign({ email: user.email }, process.env.secret_key);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// Static method to find user by credentials (email and password) for login
UserSchema.statics.findByCred = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
}

// Method to customize JSON representation of user (hiding sensitive data)
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// Middleware to hash the password before saving
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Create the User model
const User = mongoose.model("User", UserSchema);

export default User;