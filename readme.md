# Clinic App
This repository holds the source code for the frontend and backend of a clinic application that allows user to check a clinic's consultation records.

# Instructions
To use the app,

1.  clone the repository to a local folder
2.  move to the `TestServer` directory
3.  enter `npm install` and `npm start`
4.  open a new terminal, enter `npm tunnel` (we use ngrok so the react native app in development mode can connect to the local server)
5.  copy the first 12 letters of the displayed ngrok url (e.g. `cf8edc7c198c` for `http://cf8edc7c198c.ngrok.io`)  
    replace the value of `TUNNEL_ADDRESS` in the `/src/helpers/api.js` file with it
6.  open a new termial, go to root directory, enter `npm install` and enter `expo start`

The backend REST API supports the following http requests,

1.  **post** `/register`  
The body is a JSON object with the following keys: `email, password`

2.  **post** `/login`  
The body is a JSON object with the following keys: `email, password, clinicName, phone, address`

3.  **post** `/consults` (for adding one new consultation record)  
Authentication required(the clinic info is extracted from the jwt token).  
The header has to contain a Authorization key with value of the form `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvbEB3aGF0ZXZlci5jb20iLCJpYXQiOjE2MTkxNzM5NDh9.MF52yBEfuWu1SsaGXI2ib0q9blsduvRNTyT2yVHa4N8`  
The body is a JSON object with the following keys: `doctorName, patientName, diagnosis, medication, fee, datetime, followup`

4.  **get** `/consults/:consultID`  
Authentication required(you can request for only the records belonging to this clinic).

5.  **get** `/consults`  
e.g. get `/consults?year=21014&month=4&day=22&dayCount=10`  
It returns a sorted list of records belonging to this clinic that occured within the first 10 days after `2014-4-22`(inclusive)  
Authentication required.

# Demo videos
1.  [Demo of clinic app](https://www.youtube.com/watch?v=FsQ1nt9AlDU)  
    The part where the UI is not responding is due to the fact that ngrok(free plan) has a per minute connection limitation(40 max). This won't happen in production. On th detail page, doctor name is missing, the bug was already fixed after recording of the video.
2.  [Demo of login/register form validation](https://www.youtube.com/watch?v=jicISeSxmEk)

# Further improvements
Some features have been considered but were not implemented due to time restrictions.

1. Send login/register info over https
2. Add user input feedback for the monthly view UI
3. Add input validation for the REST API
4. Add a drawer to show the clinic info and a logout button
5. Add a page for adding a new entry of consultation record
6. Use react hook form for form validation

# Tech stacks
React native, react-navigation, react-native-chart-kit, react-native-calendar-strip, react-native-datepicker, axios, nodejs, express, knex, bcrypt, jsonwebtoken, moment