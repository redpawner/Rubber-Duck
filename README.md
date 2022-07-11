# RubberDuckIt


## Introduction

RubberDuckIt is a live chat application to help software developers connect and overcome challenges together.

The app allows anyone with an interest in tech to post a help request for their problem which can be answered by other developers. Once answered the participants are put into a chat room where they can take advantages of the inbuilt app features, solve the problem and learn from others in the community.

You can try out the deployed app here >> https://rubberduckit.netlify.app/ <<


## Tech Stack


|**Frontend**|**Backend**|**Database**|**API**|
|---|---|---|---|
|React|Koa|MongoDB|Apollo GraphQL|
|Zustand|Firebase|Mongoose|Socket.IO|
|Typescript|Typescript|

RubberDuckIt's frontend was built in Typescript with React, Sass and Zustand state-management solution. The backend server was built in Typescript with Koa, Firebase, custom auth middleware and Apollo. MongoDB (Atlas) with Mongoose ODM were used for the database. The WebSocket connection was set up with the Socket.IO library and GraphQL (with Apollo library) used as the API query language. The app was deployed on Heroku and Netlify and designed primarily in Figma.


## Installation (development)

Set up a [MongoDB](https://www.mongodb.com/) database running on your local machine.

Set up a [Firebase](https://firebase.google.com/) authentication service online and obtain a service account key.

Add a .env file in your server folder with the relevant information and a second .env in the client folder with the relevant information. Please see the .env.example.md files in each folder for an explanation of the required key value pairs.

In the <strong>CLIENT</strong> directory run the following commands to launch the client:

    npm install
    npm start

In the <strong>SERVER</strong> directory run:

    npm run dev

This will install the required dependencies, compile the Typescript into a /build folder and set the terminal into watch mode so any changes you make are automatically re-compiled.

In the <strong>SERVER</strong> directory open a new terminal and run: 

    npm run duck

This will start your backend server with nodemon so any changes you make will re-launch the server. If set up correctly you will receive the following    messages in the console:

  🦆 Server ready at http://localhost:PORT/graphql 🦆  
  Database connected successfully.  
  io server connected


## Available Scripts


In the <strong>SERVER</strong> directory, you can run:

    npm run seed

This will populate your MongoDB database with mock data from the server/seeds/seeds.ts file. Please note you should first create the accounts on Firebase and copy over the relevant UIDs for each email and username into the seeds.ts file.

You can also run:

    npm run dropdb

This will remove all mock data from your MongoDB database. Please note it will not remove the accounts from Firebase (you will have to do that manually).


## Contributors

Alicia Trujillo Samper - https://github.com/alitsdev  
Ferdinand Lucas - https://github.com/FerdinandLucas  
Halil Can Avşar  - https://github.com/qwertykeyboard11  
Raymond Spence - https://github.com/redpawner  
Robert Rybczynski - https://github.com/Rob4ert  
Tekraj Gurung - https://github.com/TkRj
