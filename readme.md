# CSE 120 Project
developed by Ronnie Panaligan, Wesley Chen & Vardhan Solanki for CSE 120 at UC Merced

## What are we Creating?
We are redesigning the class registration system at UC Merced by including a better way to register for classes besides refreshing the add/drop a class page seconds before a student's registration time hoping their desired classes haven't filled up yet.

## To-Do
- [x] Update frontend (In progress)
- [ ] implement some sort of queue for automatic registration
- [ ] add classes to main database hosted on heroku
- [ ] complete schedule system
- [ ] implement a function to check if user has no conflictions when registering

To get started you must have the following
1. Node
2. MongoDB (Have this running before starting server)
3. Change the url in database.js file to the your db

First install dependencies
```
npm install
```
And then run the development server
```
npm run dev
```
To run a production build
```
npm run start
```
To test out the REST api
```
node server.js
```
