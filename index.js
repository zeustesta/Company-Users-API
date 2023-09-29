import Employee from "./employees.js";
import Company from "./companies.js";

const COMPANY_URL = 'https://utn-lubnan-api-1.herokuapp.com/api/Company';
const EMPLOYEE_URL =  'https://utn-lubnan-api-1.herokuapp.com/api/Employee';

const employeesArray = new Array();
const companiesArray = new Array();


async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

function populateCompanyTable(companies) {
  const $company_table = document.getElementById('company-table');
  $company_table.innerHTML = '';

  for(let i = 0; i < companiesArray.length; i++){
    const row = $company_table.insertRow();
    row.innerHTML = `
      <td>${companiesArray[i].companyName}</td>
      <td>${companiesArray[i].companyId}</td>
    `;
  }
}

function populateEmployeeTable(employees) {
  const $employee_table = document.getElementById('employee-table');
  $employee_table.innerHTML = '';

  for(let i = 0; i < employeesArray.length/100; i++){
    const row = $employee_table.insertRow();
    row.innerHTML = `
      <td>${employeesArray[i].firstName} ${employeesArray[i].lastName}</td>
      <td>${employeesArray[i].companyId}</td>
      <td>${employeesArray[i].employeeId}</td>
      <td>${employeesArray[i].email}</td>
    `;
  }
}

async function getElements() {
  const [companies, employees] = await Promise.all([
    fetchData(COMPANY_URL),
    fetchData(EMPLOYEE_URL)
  ]);
  companies.forEach(element => {
    companiesArray.push(new Company(element.companyId, element.name));
  })
  employees.forEach(element => {
    employeesArray.push(new Employee(element.employeeId, element.companyId, element.email, element.firstName, element.lastName));
  })
  // populateCompanyTable(companiesArray);
  // populateEmployeeTable(employeesArray);
  
}

function populateResultTable(results){
  const $results_table = document.getElementById('results-table');
  $results_table.innerHTML = '';

  for(let i = 0; i < results.length; i++){
    const row = $results_table.insertRow();
    row.innerHTML = `
    <td>${results[i].firstName} ${results[i].lastName}</td>
    <td>${results[i].companyId}</td>
    <td>${results[i].employeeId}</td>
    <td>${results[i].email}</td>
    `
  }
}

let searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const $search_type = document.getElementById('searchType').value;
  const $search_input = document.getElementById('searchInput').value.toLowerCase();
  const results = [];

  switch($search_type){
    case 'id':
      const id = parseInt($search_input);
      if(!isNaN(id)){
        const resultId = employeesArray.find(emp => emp.employeeId === id);
        if (resultId) {
            results.push(resultId);
        }
      }
      break;
    case 'first&last-name':
      for (const employee of employeesArray) {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        if (fullName.includes($search_input)) {
            results.push(employee);
        }
      }
      break;
    case 'email':
      for (const employee of employeesArray) {
        if (employee.email.toLowerCase().includes($search_input)) {
            results.push(employee);
        }
      }
      break;
  }
  populateResultTable(results);
});

getElements();

// PUT FUNCTION

const postForm = document.getElementById('Post-Form');

postForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newFirstName = document.getElementById('firstName').value.toLowerCase();
  console.log(newFirstName);
  const newLastName = document.getElementById('lastName').value.toLowerCase();
  console.log(newLastName);
  const newCompanyId = document.getElementById('companyId').value;
  console.log(newCompanyId);
  const newEmail = document.getElementById('email').value.toLowerCase();
  console.log(newEmail);
  const newEmployeeId = (employeesArray[employeesArray.length - 1].employeeId + 1);
  console.log(newEmployeeId);

  let newEmployee = {
    "employeeId": newEmployeeId,
    "companyId": newCompanyId,
    "firstName": newFirstName,
    "lastName": newLastName,
    "email": newEmail
  }

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  }

  //This API doesn't accept variables

  try{
    const response = await fetch(EMPLOYEE_URL, options);
    console.log(response);
  }catch(error){
    console.log(error)
  }
});

const post_harcoded = document.getElementById('Post-Harcoded-Button');

post_harcoded.addEventListener('click', async (event) => {
  event.preventDefault();
  const newEmployeeId = (employeesArray[employeesArray.length - 1].employeeId + 1);
  
  let newEmployee = {
    "employeeId": newEmployeeId,
    "companyId": 8,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@doe.com"
  }

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  }

  try{
    const response = await fetch(EMPLOYEE_URL, options);
    console.log(response);
  }catch(error){
    console.log(error)
  }
  
  getElements();
});


