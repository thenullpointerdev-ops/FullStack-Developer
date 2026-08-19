import express from "express"; // we change in package.json "type": "module" to use import instead of require

const router = express.Router(); // create an instance of express router

router.get("/", (req, res) => {
    res.json({httpMethod: "get"});
});

// creating data : creating user - adding movie to the database
router.post("/", (req, res) => {
    res.json({httpMethod: "post"});
});

// updating data : updating user's email - updating movie in the database
router.put("/", (req, res) => {
    res.json({httpMethod: "put"});
});

// removing stuff
router.delete("/", (req, res) => {
    res.json({httpMethod: "delete "});
});



export default router; // export the router to be used in other files





