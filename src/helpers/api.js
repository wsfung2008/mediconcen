import axios from 'axios';

const TUNNEL_ADDRESS="8c263fc79b24";


async function  getDetailsByID(token, consultID){
    console.log('Start getting details');

    let config = {
        headers: {
          Authorization: "Bearer "+token
        }
      }

   return axios.get(`http://${TUNNEL_ADDRESS}.ngrok.io/consults/${consultID}`, config);
}


function getSummaries(token, year, month, day, dayCount){
    console.log('Start getting summaries');

    let config = {
        headers: {
          Authorization: "Bearer "+ token
        }
      }
    const query = `year=${year}&month=${month}&day=${day}&dayCount=${dayCount}`;
    //console.log('query: ', `http://${TUNNEL_ADDRESS}.ngrok.io/consults?`+query);

    return axios.get(`http://${TUNNEL_ADDRESS}.ngrok.io/consults?`+query, config); 

}


function  signin(email, password){
    console.log('Signing in');
 
   return axios.post(`http://${TUNNEL_ADDRESS}.ngrok.io/login`, {email, password});
 
}

function  signup(email, password, clinicName, phone, address){
    console.log('Signing up');    
 
   return axios.post(`http://${TUNNEL_ADDRESS}.ngrok.io/register`, {email, password, clinicName, phone, address});
 
}



function getDailyDetails(date){
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    instance.get(`/consults?consultID=${consultID}`)
    .then(function (response) {
        
        console.log(response);
        return response;
    })
    .catch(function (error) {
        
        console.log(error);
    })
}

export { getDetailsByID, getDailyDetails, getSummaries, signin, signup };