<!-- Cookbook Recipes -->

Cookbook Recipes is a React single-page application that allows users to discover recipes, view recipe details, and manage a personal list of favorite recipes. Users can also create and edit their own recipes which are stored in Local Storage.

The application retrieves recipe data from a public API and uses React Router for navigation between pages.

<!-- Dependencies -->

**Main dependencies used in this project:**

react

react-dom

react-router

React Router is used to implement client-side routing between pages.


<!-- Installation and Running the Project -->

**Clone the repository:**

git clone https://github.com/OksanaMosendz/react-recipe-app.git

**Navigate to the project folder:**

cd react-recipe-app

**Install dependencies:**

npm install

Run the development server:

npm run dev

**The application will run on:**

http://localhost:5173

<!-- API Connection -->

This project uses the public recipe **API TheMealDB:**

https://www.themealdb.com/api.php

The application retrieves recipe data using the following endpoints:

-random recipe

-search recipes by letter

-lookup recipe by id

<!-- Environment Variables -->

**Create a .env.local file in the project root:**

VITE_API_KEY=1

An example file is provided:

.env.local.example

**Credentials / External Services**

The project uses TheMealDB API, which allows anonymous access and does not require user credentials.
