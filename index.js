import Employee from "./employees.js";
import Company from "./companies.js";


const $company_table = document.getElementById('company-table');
const $employee_table = document.getElementById('employee-table');

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
  populateCompanyTable(companiesArray);
  populateEmployeeTable(employeesArray);
  
}

let searchButton = document.getElementById('searchForm');

searchButton.addEventListener('submit', (event) => {
  event.preventDefault()

  const $search_type = document.getElementById('searchType').value;
  const $search_input = document.getElementById('searchInput').value.toLowerCase();
  const results = [];

  switch($search_type){
    case 'id':
      const id = parseInt($search_input);
      if(!isNaN(id)){
        const resultId = employeesArray.find(emp => emp.id === id);
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
  console.log(results);
});

// function searchEmployee(){
//   const $search_type = document.getElementById('searchType').value;
//   const $search_input = document.getElementById('searchInput').value.toLowerCase();
//   const results = [];

//   switch($search_type){
//     case 'id':
//       const id = parseInt($search_input);
//       if(!isNaN(id)){
//         const resultId = employeesArray.find(emp => emp.id === id);
//           if (resultId) {
//               results.push(resultId);
//           }
//       }
//       break;
//     case 'first&last-name':
//       for (const employee of employeesArray) {
//         const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
//         if (fullName.includes($search_input)) {
//             results.push(employee);
//         }
//       }
//       break;
//     case 'email':
//       for (const employee of employeesArray) {
//         if (employee.email.toLowerCase().includes($search_input)) {
//             results.push(employee);
//         }
//       }
//       break;
//   }
//   console.log(results);
// }

getElements();

