const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const requireAuth = require('./middlewares/requireAuth');

const {
  addConsultRecord,
  findClinic,
  registerClinic,
  getDetailsByID,
  getRecords,
  getSummaries,
} = require('./helpers/db');

const app = express();

app.use(express.json());


//salt and hash the password before storing it to database
//return JSON web token if registration is successful
app.post('/register', async (req, res, next) => {
  const { email, password, clinicName, phone, address } = req.body;

  try {

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return next(err);
      }
  
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        try{
          await registerClinic( email, hash, clinicName, phone, address );
          const token = jwt.sign({ email: email }, 'MY_SECRET_KEY');
          res.send({ token });
        }catch(e){
          console.log('Failed to register: ', e);
          res.status(422).send(e.message);
        }
        
      });
    });

  } catch (err) {
    return res.status(422).send(err.message);
  }
});


//check if email is stored in database
//compare with the hashed password in the database
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('email:', email, 'password', password);

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  //const user = await User.findOne({ email }); //replace by knex code
  const clinic = await findClinic( email ); 
  if (!clinic) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }

  try {    
    bcrypt.compare(password, clinic.password, function(err, result) {
      if (result) {
        console.log("It matches!");
        const token = jwt.sign({ email: email }, 'MY_SECRET_KEY');
        res.send({ token });
      }
      else {
        console.log("Invalid password!");
        return res.status(422).send({ error: 'Invalid password' });
      }
    });

  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or email' });
  }
});


const moment = require('moment');
const uuidv1 = require("uuid").v1;


//add one single record
//requireAuth will extract email of clinic from the jwt token
app.post('/consults', requireAuth, async function(req, res){


  const consult = req.body; 
  consult.clinicEmail = req.clinic.email;

  consult.consultID = uuidv1();
   
  addConsultRecord(
    consult//{consultID, doctorName, patientName, diagnosis, medication, fee, datetime, followup}
  ).then(()=>res.status(200).send('successfully added'))
  .catch((err)=>{
    console.log('Failed to add new consultation record: ', err);
    res.status(400).send('Failed to add new consultation record');
  });
  
})


//get consultation record with the given consultID
app.get('/consults/:consultID', requireAuth, async function(req, res){

  consultID = req.params.consultID;

  getDetailsByID(consultID)
  .then((consult)=>{
    const email = req.clinic.email; //email extracted from jwt
    findClinic( email ).then(clinic=>{ 
      if (!clinic) {
        return res.status(422).send({ error: 'Invalid token' });
      }
      if (consult.clinicEmail!=email){ //if the email associated with the given consultID is not the same as the email from jwt
        res.status(422).send({ error: 'The requested consultation record doesnt belong to this clinic' });
        return;
      }
      res.status(200).send(consult);
    });
    
  }).catch((err)=>{
    res.status(400).send('Bad request');
  });
     
});


//get the list of records from within the first dayCount days after year-month-day 
//if mode==summary, return only doctorName, patientName, fee and datetime
app.get('/consults', requireAuth, async function(req, res){

  console.log('req.clinic: ', req.clinic);
  console.log('req.params: ', req.query);

  const {year, month, day, dayCount, mode} = req.query; 
  clinicEmail = req.clinic.email;

  if (mode === "summary"){
    
    getSummaries( {clinicEmail, year, month, day, dayCount} )
    .then(summaries=>{
      if (!summaries)
        res.status(404).send('Not found');
      else
        res.status(200).send(summaries);
    })
    .catch(error=>res.status(400).send('Bad request'));
    
  }else{
    
    getRecords( {clinicEmail, year, month, day, dayCount} )
    .then(records=>{
      if (!records)
        res.status(404).send('not found');
      else
        res.status(200).send(records);
    })
    .catch(error=>res.status(400).send('bad request'));
  }

})



app.listen(3000, () => {
  console.log("Listening on port 3000");
});
