# Use-My-Tools-CSR
Use My Tools is a rental marketplace web app where individuals can find and rent tools owned by people nearby. It's a great way to save money when you need a tool for one project and it's not worth buying one.

![Search for Tools](/assets/images/find-tools.png)

The deployed app is hosted at https://usemytoolssf.netlify.com.

The root directory contains backend (server and database) code as well as the use-my-tools React App, which contains the front end (client app) code.

## Styling
Most of the UI styling is done in plain CSS. The organizational pattern for css files is as follows:
- A component that uses CSS styling has a single CSS file that styles its elements
- A component's corresponding CSS file is located in a directory called `css` located in the same parent directory as the component

A few components, such as some Material UI components, use MUI class styling, wich classes defined in a styles function that returns an object containing the relevant classes. This styles function will be located in the same file as the parent component where the MUI component is rendered.

## Backend Server:

The backend server is built with express and Node.js. In the root directory, 'server.js' contains the code that configures the backend express server and defines the base URLs for the various API categories. 'server.js' also imports Firebase config variables and uses Firebase Authentication to authenticate requests before allowing them to access the API. 'index.js' imports 'server.js' and initializes the server listener on the designated port. 

The code for API endpoints is contained in the 'api' folder, organized into folders for rentals, tools, and users.

## Database:

The app uses a Postgres SQL database with migrations and database queries built using the knex.js library. The file named 'knexfile.js' located in the root directory holds the knex configruation information. The folder named 'db' contains code for the database, with the following sub-folders:

- The folder 'helpers' contains helper functions used to perform operations and queries on the database.
- The folder 'migrations' contains the knex migration files used to construct the database table schemas.
- The folder 'seeds' contains database seed files. 
- The file 'db.js' located at filepath 'db/db.js' imports the knex config file used by the database. 

## Front End (Client) app:

The code for the front end app is in the use-my-tools directory. The React App starts at the index.js file, which renders App from App.js. In practical terms, App.js is the parent component of the subcomponents with which users interact, and it renders routes to most subcomponents based on the auth state of the user.

<!-- ## How to run the app in a development environment:
1) Fork and/or clone the repository.

2) Install dependencies:
    - from the root directory run the command `npm install`

3) Create a local Postgres database, making sure that the username under which you create the db, the password, and the name of the db match the corresponding values in the file 'knex.js' found in the root directory.

4) Run database migrations to create the tables in the postgres db:
    - From the root directory, run the command `knex migrate:latest`

5) Run database seed files:
    - From the root directory, run the command `knex seed:run`

6)  Set up Firebase Authentication:
    - Create an account with Google Firebase
    - Follow documentation on configuring Firebase authentication from the Firebase Console. 
    - Create a .env file in the root directory and copy the configuration values provided by Firebase

7) Start the backend server:
    - From the root directory run command `node index.js`

8) Start the frontend (client) server:
    - cd into the use-my-tools directory by running `cd use-my-tools` from the root directory
    - run the command `npm start` -->


