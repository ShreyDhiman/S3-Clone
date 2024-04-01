import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library for JWT operations
import User from '../models/user.js'; // Import the User model
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from a .env file into process.env
// Middleware function for user authentication
export const auth = async (req, res, next) => {
    try {
        // Extract the JWT token from the request header
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.secret_key);

        // Find the user associated with the decoded token
        const user = await User.findOne({ email: decoded.email, 'tokens.token': token });

        // If user is not found, throw an error
        if (!user) {
            throw new Error();
        }

        // Attach the token and user object to the request for further processing
        req.token = token;
        req.user = user;

        // Call the next middleware function
        next();
    } catch (e) {
        // If any error occurs during authentication, send a 401 Unauthorized response
        res.status(401).send('Please log in!');
    }
};
