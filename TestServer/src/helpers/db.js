const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "database-clinic.c8blgkhjepcn.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "MlPSUHrT5rXP3hBSIUvU",
    database: "freedbtech_clinicAppDB",
  },
}); 


const moment = require("moment");


//create Clinics and Consults tables
const createTables = async function () {
  
    return knex.schema.createTable("Clinics", (table) => {
      table.string("email").primary();
      table.string("clinicName").notNullable();//.unique();
      table.string("password").notNullable();
      table.string("phone").notNullable();
      table.string("address").notNullable();
    })
    .createTable("Consults", (table) => {
      table.uuid("consultID").primary();
      table.string("clinicEmail").notNullable()
        .references("email")
        .inTable("Clinics")
        .onDelete("CASCADE");
      table.string("doctorName").notNullable();
      table.string("patientName").notNullable();
      table.text("diagnosis").notNullable();
      table.text("medication").notNullable();
      table.decimal("fee").unsigned().notNullable();
      table.datetime("datetime", { precision: 0 }).notNullable();
      table.boolean("followup").defaultTo(0);
    }).then()
    .catch(error=>console.log());
  
};


const addConsultRecord = async function(
  {consultID, clinicEmail, doctorName, patientName, diagnosis, medication, fee, datetime, followup}
  ){
    console.log('Adding new consult record');

    return await knex("Consults").insert({
      consultID,
      clinicEmail,
      doctorName,
      patientName,
      diagnosis,
      medication,
      fee,
      datetime, 
      followup,
    }).then( );

}


const dropTables = async function () {
  try{
    console.log('Start dropping tables')
    return knex.schema.dropTableIfExists("Consults")
      .dropTableIfExists("Clinics")
      .then();
  }catch(e){
    console.log(e);
  }
};


const findClinic = async function (email) {
  try {
    const clinic = await knex
      .from("Clinics")
      .select("email", "clinicName", "password", "phone", "address")
      .where("email", email).then();

    console.log("Foung clinic in database: ", clinic); 
    if (!clinic || clinic.length==0 ) {
      throw new Error(" A clinic with this email doesn't exist");
    }
    return clinic[0];
  } catch (e) {
    console.log('Failed to find clinic in database:', e); 
    return null;
  }
};

const registerClinic = async function (
  email,
  password, 
  clinicName,
  phone,
  address
) {
    console.log('Registering clinic');

    const clinic = await  knex
      .from("Clinics")
      .select("email", "password", "clinicName", "phone", "address")
      .where("email", email)
      .then(); 

    if (clinic.length>0) {
      console.log(" This email has already been registered");
      throw new Error(" This email has already been registered");
    } else{
      await knex("Clinics").insert({ email, clinicName, password, phone, address }).then();
    }

};

const getDetailsByID = async function (consultID) {
  
  console.log('Getting details for consultID: ', consultID);
  const records = await knex
    .from("Consults")
    .select('consultID', 'clinicEmail', 'doctorName', 'patientName', 'diagnosis', 'medication', 'fee', 'datetime', 'followup')
    .where('consultID', consultID)
    .then();

    if (records.length>0){      
      return records[0];
    }
    else
      return null;

}


const getRecords = async function ({clinicEmail, year, month, day, dayCount}) {
  
  let start = moment(`${year}-${month}-${day}`);
  let end = start.clone().add(dayCount-1, 'day');

  console.log('Getting records for query range', year, month, day, dayCount);
  const records = await knex
  .from("Consults")
  .select('consultID', 'clinicEmail', 'doctorName', 'patientName', 'diagnosis', 'medication', 'fee', 'datetime', 'followup')
  .where('clinicEmail', clinicEmail)
  .whereBetween('datetime', [start.format('YYYY-MM-DD HH:mm:ss'), end.hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss')])
  .orderBy('datetime').then();

  if (records && records.length>0)
    return records;
  else
    return null;
};


const getSummaries = async function ({clinicEmail, year, month, day, dayCount}) {
  
  let start = moment(`${year}-${month}-${day}`);
  let end = start.clone().add(dayCount-1, 'day');

  console.log('Getting sumaries for query range', year, month, day, dayCount);

  const summaries = await knex
  .from("Consults")
  .select('consultID', 'doctorName', 'patientName', 'fee', 'datetime')
  .where('clinicEmail', clinicEmail)
  .whereBetween('datetime', [start.format('YYYY-MM-DD HH:mm:ss'), end.hours(23).minutes(59).seconds(59).format('YYYY-MM-DD HH:mm:ss')])
  .orderBy('datetime').then();

  if (summaries && summaries.length>0)
    return summaries;
  else
    return null;
};

module.exports = {
  knex,
  createTables,
  dropTables,
  addConsultRecord,
  findClinic,
  registerClinic,
  getDetailsByID,
  getRecords,
  getSummaries,
};


