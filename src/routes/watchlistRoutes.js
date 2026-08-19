import express from "express"; // we change in package.json "type": "module" to use import instead of require
import { addToWatchlist, removeFromWatchlist, updateWatchlistItem } from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router(); // create an instance of express router

router.use(authMiddleware)

// we will not apply validateRequest to all of our API (means will not use router.use()). We only apply it before addToWacthlist
// it require a schema , so we will pass a schema.
router.post("/", validateRequest(addToWatchlistSchema),addToWatchlist);

// when delete, we need to get the info. Which is the ID of movie. Or the ID of watchlist.
// when we work with (post, delete) , we usually do not send the ID through the body.
// Best practice is said : ID through the paramrs of the route. It will be like this: 
//          {{BaseUrl}}/watchlist/:id 
router.delete("/:id", removeFromWatchlist);

router.put("/:id", updateWatchlistItem)

export default router; // export the router to be used in other files



/**
 * 
 * Middle ware:
 *  
 * is a function set in between request & responce.
 * Let you run the code in between these two.
 * Modify request.
 * Check permissions you might want to check OR even stop request before it reaches the route handler that we created.
 * 
 * What is the point of this function?
 * for example, if we have an API , where certain API endpoints require 
 * you to be a spcific role, (like an admin in your API , to be able to make that API request),  in the middle 
 * ware is where you you would check for the role of the user. 
 * 
 * In here , when we are dealing with authentication, we want to add a middleware that will check to see if 
 * the user has a JWT token when they are making request , and validate to see if that is the spcific user that can make request.
 * 
 * Now, how we do that? 
 * 
 * 
 */

