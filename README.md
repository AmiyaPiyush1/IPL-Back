# Team Assignment Project

This project implements a team assignment system using MongoDB and Node.js. Users are assigned to teams based on their preferences and a points-based evaluation system.

---

## Table of Contents

1. [Project Setup](#project-setup)  
2. [Environment Variables](#environment-variables)  
3. [Team Assignment Logic](#team-assignment-logic)

---

## Project Setup

### Prerequisites
- **Node.js**: Ensure you have Node.js installed. 
- **MongoDB**: Set up a local or cloud MongoDB instance.
- **React**: Ensure you have proper react setup.    

### Steps

1. Clone the repository:
   ```bash
   frontend:-
   git clone <https://github.com/AmiyaPiyush1/ipl-frnt>
   cd <repository-folder>
   backend:-
   git clone <https://github.com/AmiyaPiyush1/IPL-back>
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and configure the MongoDB connection string as described here.

Start the server:

bash
Copy code
npm start
Access the application at http://localhost:3001.

Environment Variables
The project only requires one environment variable to be set in the .env file in backend:

Variable Name	Description	Example Value
MONGO_URL	Connection string for MongoDB	mongodb://localhost:27017/db_name


for frontend use:- npm run dev to start with



Team Assignment Logic
The team assignment is based on a points system, with users earning or losing points based on their selections. Here's how it works:

City Selection :

When a user selects a city, they earn 3 points.
Color Selection:

If the user selects a color that matches the city they selected (city-color mapping), they earn 2 points.
If the color does not match, they lose 2 points.
Batting Style Selection:

If the user selects a batting style that matches the predefined mapping (city-batting style mapping), they earn 1 point.
If the style does not match, they lose 1 point.
Final Assignment:

After calculating the total points, if the total points are greater than or equal to 1, the user is assigned to a specific team based on their total score.
If the total points are less than 1, the user is randomly assigned to a team.
This logic ensures that users who have better matches with the system's criteria are assigned to specific teams, while users with lower scores are randomly assigned to a team.
