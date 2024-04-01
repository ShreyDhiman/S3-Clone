import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js"; // Importing the main router for routing
import swaggerJSDoc from 'swagger-jsdoc'; // Importing Swagger JSDoc for API documentation generation
import swaggerUi from 'swagger-ui-express'; // Importing Swagger UI for API documentation rendering

dotenv.config(); // Load environment variables from a .env file into process.env

const app = express(); // Creating an Express application
app.use(express.json()); // Middleware to parse JSON requests

// Define application routes
app.use(router);

// Swagger API documentation setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'S3-Clone API Documentation', // Title of the API documentation
            version: '1.0.0', // Version of the API
            description: 'API documentation for S3-Clone', // Description of the API
        },
    },
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'], // Define paths to files containing route definitions
};

const swaggerSpec = swaggerJSDoc(swaggerOptions); // Generate Swagger specification

// Endpoint to serve Swagger JSON
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Endpoint to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 6000; // Define the port number from environment variables or default to 6000

// Connect to MongoDB database and start the server
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log("Server is up at:", PORT)); // Start the server
}).catch(err => console.log(err)); // Error handling for database connection