// define the schema for each route that includes a body in the request.

import { z } from 'zod';

const addToWatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
        // if its not of the options of the above, we will set an error.
        error: () => ({
            message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
        }), // because status is optional  to pass, so we will write (optional) 
    }).optional(),

    // in rating : we are only allow int, but what if someone pass string? So, we will allow both.
    // using coerece,  convert string to be number. And then validate to see if its int.
    // we pass error message.
    rating: z.coerce.number()
        .int("Rating must be integer")
        .min(1, "Rating must be between 1 and 10")
        .max(10, "Rating must be between 1 and 10")
        .optional(),

    notes: z.string().optional(),
})

export { addToWatchlistSchema };