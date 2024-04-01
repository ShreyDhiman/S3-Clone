import express from "express";
import authRoutes from "../routes/auth.js";
import bucketRoutes from "../routes/bucket.js";
import fileRoutes from "../routes/files.js";

// Create an Express router instance
const router = express.Router();

// Define default routes with their corresponding paths
const defaultRoutes = [
  {
    path: '/auth', // Path for authentication routes
    route: authRoutes, // Authentication routes handler
  },
  {
    path: '/bucket', // Path for bucket-related routes
    route: bucketRoutes, // Bucket routes handler
  },
  {
    path: '/file', // Path for file-related routes
    route: fileRoutes, // File routes handler
  },  
];

// Iterate through the default routes and mount them to the router
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// Export the router to be used by the application
export default router;