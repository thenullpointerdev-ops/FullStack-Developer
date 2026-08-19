🎬 Watchlist & Movie REST API

A robust RESTful API built with Node.js, Express, and Prisma ORM for managing movie catalogs, user authentication, and personalized watchlists. Features secure JWT authentication via HTTP-only cookies/headers, Zod request schema validation, and graceful process error handling.

🛠 Tech Stack
Runtime: Node.js (ES Modules)  
Framework: Express.js  
ORM: Prisma  
Authentication: JSON Web Tokens (jsonwebtoken) & bcryptjs  
Validation: Zod  


🔑 Key Features
JWT Authentication: Stateful token handling supporting both Authorization: Bearer <token> headers and secure HTTP-Only cookies.  
Input Validation: Automated body validation using Zod schemas (e.g., validating UUIDs, rating ranges from 1–10, and specific status enums).  
Graceful Shutdown: Configured handlers for unhandledRejection, uncaughtException, and SIGTERM signals to prevent database connection leaks.  
Protected Watchlist Operations: Ownership verification before allowing updates or deletions on watchlist entries.

📍 API Reference
🔐 Authentication Routes (/auth)

Method	Endpoint	       Description	                                Auth Required
POST	  /auth/register	 Register a new user & return JWT token	           No
POST	/auth/login	       Authenticate user & issue JWT token/cookie	        No
POST	/auth/logout	     Clear authentication cookie                        No



🎬 Movie Routes (/movies)

Method	Endpoint	     Description	                           Auth Required
GET	    /movies	       Fetch all movies	                              No
POST	  /movies	       Add a new movie to the system	                No
PUT	    /movies	       Update movie details	                          No
DELETE	/movies	       Remove a movie from the system	                No




📑 Watchlist Routes (/watchlist)
All watchlist routes require a valid JWT via header or cookie.

Method	Endpoint	       Description	                              Request Body / Params
POST	  /watchlist	       Add a movie to user's watchlist	          { movieId, status?, rating?, notes? }
PUT	    /watchlist/:id	   Update status, rating, or notes	          { status?, rating?, notes? }
DELETE	/watchlist/:id	   Remove an item from user's watchlist	       Route param :id






Watchlist Schema Validation Rules:
movieId: Valid UUID string.  
status: Must be one of PLANNED, WATCHING, COMPLETED, or DROPPED (default: PLANNED).  
rating: Integer between 1 and 10.  
notes: Optional string.  


📁 Project Structure

├── config/
│   └── db.js               # Database connection and disconnection logic[cite: 1]
├── controllers/
│   ├── authControllers.js  # Registration, login, and logout logic[cite: 4, 9]
│   └── watchlistController.js # Watchlist CRUD & ownership handling[cite: 6, 10]
├── middleware/
│   ├── authMiddleware.js   # JWT verification middleware[cite: 6, 7]
│   └── validateRequest.js  # Zod schema validation middleware[cite: 6, 8]
├── routes/
│   ├── authRoutes.js       # Auth endpoint routes[cite: 4]
│   ├── movieRoutes.js      # Movie endpoint routes[cite: 1, 5]
│   └── watchlistRoutes.js  # Watchlist endpoint routes[cite: 1, 6]
├── validators/
│   └── watchlistValidators.js # Zod schemas for payload validation[cite: 2, 6]
├── .env                    # Environment variables configuration[cite: 1]
├── server.js               # Express application setup & lifecycle handlers[cite: 1]
└── README.md
