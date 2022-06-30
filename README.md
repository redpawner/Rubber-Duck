# Rubber-Duck

## Installation

### Authentication:

### SERVER FOLDER:

Database:

Set up a MongoDB database locally and copy the server name into a .env within the server folder. See the .env.example folder for instructions.

Server:

Add your preferred PORT to the .env file.

Store your firebase service account json file in the server folder and set the file pathway to the GOOGLE_APPLICATION_CREDENTIALS variable in the .env folder.

Within the server folder run the following commands in this order:

_npm run dev_ - this will install the required dependencies, compile the typescript code to javascript and set your terminal to automatically re-compile any changes

Open a new terminal and run:

_npm run duck_ - this will run the server which will automatically update with any changes

To seed your database with mock data (that works with Firebase) run:

_npm run seed_

### CLIENT FOLDER:

Within the client folder run the following commands in this order:

_npm i_ - this will install the required dependences

_npm start_ - this will run the app in your browser with automatic updates
