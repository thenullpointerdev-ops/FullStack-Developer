// This middleware will aply to every single route that requires
// us to pass  a body to it.

export const validateRequest = (schema) => {
    /** 
     * based on the shema , it is going to either allow the user to continue moving with the request or 
     * basically return back an error message of where they are failing the schema. 
     * */

    return (req, res, next) => {
        // cheack to see if the body of the request passes the schema.
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // getting the error messages.
            const formatted = result.error.format();
            const flatErrors = Object.values(formatted).flat().filter(Boolean).map((err)=> err._errors).flat();

            // we wil not continue with request
            return res.status(400).json({ message: flatErrors.join(", ") });
        }

        // if success, we will call next function & move forward.
        next();
    }
}
