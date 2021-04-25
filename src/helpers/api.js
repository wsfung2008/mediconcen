import axios from 'axios';
//use axios to get data from api
//mock data for now?

//how to set up token, cant access context
//recreate instance for evert request?
/*
const instance = axios.create({
    baseURL: 'http://local:3000/',
    timeout: 1000,
    headers: {'Authorization': token}
  });
*/


//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbTdAeWFob28uY29tIiwiaWF0IjoxNjE4ODQ4ODcxfQ.ciAqNUAovWoWhJ1ZoJaMLY9q9z2VAnN64zFOhy7jODc

const TUNNEL_ADDRESS="1b26e2008e4f";

//token
async function  getDetailsByID(token, consultID){
    console.log('start getting details');
    //instance.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbTdAeWFob28uY29tIiwiaWF0IjoxNjE4ODQ4ODcxfQ.ciAqNUAovWoWhJ1ZoJaMLY9q9z2VAnN64zFOhy7jODc';
    //instance.get(`/consults/131`)
    //console.log("token:", token);
    let config = {
        headers: {
          Authorization: "Bearer "+token
        }
      }
      //219.73.8.217
    //axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbmRvbTdAeWFob28uY29tIiwiaWF0IjoxNjE4ODQ4ODcxfQ.ciAqNUAovWoWhJ1ZoJaMLY9q9z2VAnN64zFOhy7jODc' // for all requests
/*
    fetch('http://localhost:3000/consults/131')
  .then(response => response.json())
  .then(data => console.log(data));
  */
   return axios.get(`http://${TUNNEL_ADDRESS}.ngrok.io/consults/${consultID}`, config);
}

function getSummaries(token, year, month, day, dayCount){
    console.log('start getting summaries', token);

    let config = {
        headers: {
          Authorization: "Bearer "+ token
        }
      }
    const query = `year=${year}&month=${month}&day=${day}&dayCount=${dayCount}`;
    console.log('query: ', `http://${TUNNEL_ADDRESS}.ngrok.io/consults?`+query);

    return axios.get(`http://${TUNNEL_ADDRESS}.ngrok.io/consults?`+query, config); 

}


//is async needed?
function  signin(email, password){
    console.log('signing in');
 
   return axios.post(`http://${TUNNEL_ADDRESS}.ngrok.io/login`, {email, password});
 
}

function  signup(email, password, clinicName, phone, address){
    console.log('signing up');
    
 
   return axios.post(`http://${TUNNEL_ADDRESS}.ngrok.io/register`, {email, password, clinicName, phone, address});
 
}



function getDailyDetails(date){
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    instance.get(`/consults?consultID=${consultID}`)
    .then(function (response) {
        // handle success
        console.log(response);
        return response;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

export { getDetailsByID, getDailyDetails, getSummaries, signin, signup };