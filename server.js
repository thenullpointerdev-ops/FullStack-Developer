import express from "express"; //import express module
import { config } from "dotenv"; //import dotenv module
import { connectDB, disconnectDB } from "./config/db.js"; //import connectDB function from db.js
// Import Routes
import movieRoutes from "./routes/movieRoutes.js"; //import movie routes
import authRoutes from "./routes/authRoutes.js"; //import movie routes
import watchlistRoutes from "./routes/watchlistRoutes.js";


config(); //load environment variables from .env file
connectDB(); //connect to the database

// when our DB breaks , we need to handle it gracefully and disconnect from the DB
const app = express(); //create an instance of express

// Body Parsing Middleware
app.use(express.json());
//to said to express to automatically parse data from an HTML format submission , so you can access it in request body
app.use(express.urlencoded({ extended: true }))

// API Routes : which is port 
app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchlistRoutes);

const PORT = 5001; //set the port to listen on
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
// this is an event , that happen in our process . We are listen to our event.
// it listen to this event and when it happens , it does smth
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    // end our server 
    server.close(async () => {
        await disconnectDB(); //disconnect from the database 
        process.exit(1); //exit the process with failure code
    });
});



process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    // end our server 
    server.close(async () => {
        await disconnectDB(); //disconnect from the database 
        process.exit(1); //exit the process with failure code
    });
});


// SIGTERM : which means app stop in production
process.on("SIGTERM", (err) => {
    console.log("SIGTERM signal received. Shutting down gracefully.");
    // end our server 
    server.close(async () => {
        await disconnectDB(); //disconnect from the database 
        process.exit(0); //exit the process with failure code
    });
});



// AUTH - signup, login, logout, forgot password, reset password
// MOVIE - GETTING ALL MOVIES
// USER - PROFILE
// WATCHLIST - 