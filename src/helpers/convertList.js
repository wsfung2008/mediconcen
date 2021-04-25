import moment from 'moment';


const summaries=[
  {consultID: "1e0cf090-a314-11eb-bfc2-a9f9b4ba6d96", doctor: 'John Doe', patient: 'Alex Wong', fee: 40, datetime: '2021-04-20 07:20:01'},
  {consultID: "36d5b260-a314-11eb-bfc2-a9f9b4ba6d96", doctor: 'Jay Chou', patient: 'Samuel Jackson', fee: 50, datetime: '2021-04-20 07:30:01'},
  {consultID: "4eddbc40-a314-11eb-bfc2-a9f9b4ba6d96", doctor: 'Peter Chun', patient: 'David Letterman', fee: 40, datetime: '2021-04-20 08:50:31'},
  {consultID: "7a82fbd0-a314-11eb-bfc2-a9f9b4ba6d96", doctor: 'Ken Hui', patient: 'Michael Jordan', fee: 60, datetime: '2021-04-20 09:10:01'},
  {consultID: "aac06120-a314-11eb-bfc2-a9f9b4ba6d96", doctor: 'Susan So', patient: 'Denis Lau', fee: 80, datetime: '2021-04-20 11:20:01'},
  {consultID: "fe2202c0-a313-11eb-bfc2-a9f9b4ba6d96", doctor: 'Michel Goemans', patient: 'Joey Chan', fee: 100, datetime: '2021-04-20 15:20:01'},
  {consultID: "fe2202c0-a313-11eb-bfc2-a9f9b4ba6d96", doctor: 'Nick Harvey', patient: 'Vannessa Max', fee: 70, datetime: '2021-04-20 7:40:01'},
  {consultID: "fe2202c0-a313-11eb-bfc2-a9f9b4ba6d96", doctor: 'Susan So', patient: 'Denis Lau', fee: 80, datetime: '2021-04-20 12:20:01'},
  {consultID: "fe2202c0-a313-11eb-bfc2-a9f9b4ba6d96", doctor: 'Michel Goemans', patient: 'Joey Chan', fee: 100, datetime: '2021-04-20 0:20:01'},
  {consultID: "fe2202c0-a313-11eb-bfc2-a9f9b4ba6d96", doctor: 'Nick Harvey', patient: 'Vannessa Max', fee: 70, datetime: '2021-04-20 11:40:01'},

];

const listData = [
  {title: '0', data:[]},
  {title: '1', data:[]},
  {title: '2', data:[]},
  {title: '3', data:[]},
  {title: '4', data:[]},
  {title: '5', data:[]},
  {title: '6', data:[]},
  {title: '7', data:[]},
  {title: '8', data:[]},
  {title: '9', data:[]},
  {title: '10', data:[]},
  {title: '11', data:[]},
  {title: '12', data:[]},
  {title: '13', data:[]},
  {title: '14', data:[]},
  {title: '15', data:[]},
  {title: '16', data:[]},
  {title: '17', data:[]},
  {title: '18', data:[]},
  {title: '19', data:[]},
  {title: '20', data:[]},
  {title: '21', data:[]},
  {title: '22', data:[]},
  {title: '23', data:[]}
]

summaries.forEach((current)=>{
  listData[moment(current.datetime).hours()].data.push(current);
});

const convertedList = listData.filter(current=>current.data.length>0);

function  convertList(summaries){
  const listData = [
    {title: '0', data:[]},
    {title: '1', data:[]},
    {title: '2', data:[]},
    {title: '3', data:[]},
    {title: '4', data:[]},
    {title: '5', data:[]},
    {title: '6', data:[]},
    {title: '7', data:[]},
    {title: '8', data:[]},
    {title: '9', data:[]},
    {title: '10', data:[]},
    {title: '11', data:[]},
    {title: '12', data:[]},
    {title: '13', data:[]},
    {title: '14', data:[]},
    {title: '15', data:[]},
    {title: '16', data:[]},
    {title: '17', data:[]},
    {title: '18', data:[]},
    {title: '19', data:[]},
    {title: '20', data:[]},
    {title: '21', data:[]},
    {title: '22', data:[]},
    {title: '23', data:[]}
  ]
  summaries.forEach((current)=>{
    listData[moment(current.datetime).hours()].data.push(current);
  });

  return listData.filter(current=>current.data.length>0);
}

export { convertedList, convertList };