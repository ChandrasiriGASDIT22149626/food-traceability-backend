Food Traceability System - Supply Chain TransparencyThis is a Full-Stack application developed as part of the SE3040 - Application Frameworks module. It enables end-to-end transparency in the food supply chain, tracking products from the farm origin to the end consumer.

 Project Planning & Architecture 

 Architecture Justification
 The project follows a Clean Architecture (MVC) pattern to separate business logic from data access.
 Express.js (Node.js): Chosen for its performance in building RESTful APIs.
 MongoDB: Used for its flexible document-based schema, ideal for evolving supply chain logs.JWT & Bcrypt: Implemented for secure, role-based session handling.
 
  Setup Instructions
  Follow these steps to get the project running locally:
  Clone the repository:Bashgit clone https://github.com/ChandrasiriGASDIT22149626/food-traceability-backend.git
  cd food-traceability-backend

Install dependencies:
Bashnpm install

Configure Environment Variables:
Create a .env file in the root directory (see the "Environment Variables" section below).

Run the application: 

# For development (using nodemon)
npm run dev

# For production
npm start

3Environment Variables
To run this project, you will need to add the following environment variables to your .env file. 
PORT: The port number the server runs on (e.g., 5000).
MONGO_URI: Your MongoDB Atlas connection string.
JWT_SECRET: A secure string used to sign JSON Web Tokens.

