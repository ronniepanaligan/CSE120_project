# UCM Automatic Registration
developed by Ronnie Panaligan, Wesley Chen & Vardhan Solanki for CSE 120 at UC Merced

Update 12/31/2017 - This project has been discontinued, I will eventually recreate this project in the future.

## How it works
We have created queues for each class that is used to store students who wish to enroll a class. Once there is room in the class, the student will be
taken out of the queue and be notified they have successfully been added to the class. Other functionalities include search through the UCM class directory, saving a class for future enrollment, and creating a simple schedule.

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
npm run startDev
```
