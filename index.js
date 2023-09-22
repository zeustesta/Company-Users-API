const $xhr = document.getElementById('xhr');
const API_URL = 'https://jsonplaceholder.typicode.com/users';

async function getElements(){
  try{
    const response = await fetch(API_URL);
    const resultText = await response.json();
    addUsers(resultText);

  }catch (error){
    console.log(error);
  }
}

function addUsers(users){
  $xhr.innerHTML = '';

  users.forEach(element => {
    const row = $xhr.insertRow();
    row.innerHTML = `
    <td>${element.name}</td>
    <td>${element.id}</td>
    `
  });
  
}

getElements();

