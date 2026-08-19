import { prisma } from "../config/db.js"; // correct 

const addToWatchlist = async (req, res) => {
    // get from request inside of body a couple things 
    const { movieId, status, rating, notes } = req.body;

    // verfiy movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }

    // check if i alredy added to watch list.
    // Unique watch list item: is a combination of user & movie.
    const existingInWatchlist = await prisma.watchListItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        },
    });

    // if it exists, return an error; otherwise create the watchlist item
    if (existingInWatchlist) {
        return res.status(400).json({ error: "Movie already in watch list." });
    }

    // create out watch list item
    const watchlistItem = await prisma.watchListItem.create({
        data: {
            userId: req.user.id,
            movieId,
            // depends on what you have passed on the body. it you have we will sent it, if not we put a defualt which is "palnned"
            status: status || "PLANNED",
            rating,
            notes,
        }
    });

    res.status(201).json({
        status: "success",
        data: {
            watchlistItem,
        }
    });
};


/**
 * Remove movie from watchlist
 * Deletes watchlist item
 * Ensures only owner can delete
 * Requires protect middleware
 */
const removeFromWatchlist = async (req, res) => {
    // Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchListItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // Ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res
            .status(403)
            .json({ error: "Not allowed to update this watchlist item" });
    }

    await prisma.watchListItem.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Movie removed from watchlist",
    });
};

/**
 * Update watchlist item
 * Updates status, rating, or notes
 * Ensures only owner can update
 * Requires protect middleware
 */
const updateWatchlistItem = async (req, res) => {
    const { status, rating, notes } = req.body;

    // Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchListItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // Ensure only owner can update
    if (watchlistItem.userId !== req.user.id) {
        return res
            .status(403)
            .json({ error: "Not allowed to update this watchlist item" });
    }

    // Build update data
    const updateData = {};
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    // Update watchlist item
    const updatedItem = await prisma.watchListItem.update({
        where: { id: req.params.id },
        data: updateData,
    });

    res.status(200).json({
        status: "success",
        data: {
            watchlistItem: updatedItem,
        },
    });
};


export { addToWatchlist, removeFromWatchlist, updateWatchlistItem };


