//This file is only for testing

const { LoremIpsum } = require("lorem-ipsum");

const firstNames=['James', 'David', 'Candy', 'Joey', 'Tracy', 'Darien', 'Joseph', 'Louis', 'Wendy', 'Naomi', 'Carl', 'Betty', 'Rachel', 'Kevin', 'Tom', 'Nick', 'Diana', 'Joana', 'Chris', 'Samuel'];
const lastNames =['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Anderson', 'Wilson', 'Taylor', 'Thomas', 'Moore', 'Martin', 'Jackson', 'White', 'Lopez', 'Lee', 'Harris', 'Clark'];
const clinicPostfixes = ['Healthcare', 'Care Center', 'Health Hub', 'Health Services', 'Clinic', 'Clinic', 'Hospital', 'Group', 'Collective', 'Therapy', 'Medical', 'Doctors', 'Practice', 'Medicine Care', 'Physician', 'Family Practice', 'Medical Center', 'Medical Service', 'Solutions', 'Fitness Center']
const streetPostfixes =['Road', 'Avenue', 'Street', 'Plaza', 'Square', 'Boulevard', 'Drive', 'Court', 'Way', 'Place'];
const districts = ['Central', 'Eastern', 'Southern', 'Wan Chai', 'Sham Shui Po', 'Kowloon City', 'Kwun Tong', 'Wong Tai Sin', 'Yau Ma Tei', 'Tsim Sha Tsui', 'Mong Kok', 'Islands', 'Kwai Tsing', 'North', 'Sai Kung', 'Sha Tin', 'Tai Po', 'Tsuen Wan', 'Tuen Mun', 'Yuen Long'];

const randomEle = (arr)=> arr[Math.floor(Math.random()*arr.length)];

const randomPeopleName = ()=> `$(randomEle(firstNames)) $(randomEle(lastNames))`;
const randomClinicName = ()=> `$(randomEle(lastNames)) $(randomEle(clinicPostfixes))`;
const randomPhone = ()=> Math.random().toString().slice(2,10);

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
  
lorem.generateWords(1);
lorem.generateSentences(5);
lorem.generateParagraphs(7);
  
const randomAddress = ()=> `$(Math.ceil(Math.random()*100)), $(randomEle(lastNames)) $(randomEle(clinicPostfixes)), $(ranndomEle(districts))`;

module.exports = { randomPeopleName, randomClinicName, randomPhone, randomAddress };
