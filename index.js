const $company_table = document.getElementById('company-table');
const $employee_table = document.getElementById('employee-table');

const COMPANY_URL = 'https://utn-lubnan-api-1.herokuapp.com/api/Company';
const EMPLOYEE_URL =  'https://utn-lubnan-api-1.herokuapp.com/api/Employee';


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

  companies.forEach(element => {
    const row = $company_table.insertRow();
    row.innerHTML = `
      <td>${element.name}</td>
      <td>${element.companyId}</td>
    `;
  });
}

function populateEmployeeTable(employees) {
  $employee_table.innerHTML = '';

  employees.forEach(element => {
    const row = $employee_table.insertRow();
    row.innerHTML = `
      <td>${element.firstName} ${element.lastName}</td>
      <td>${element.companyId}</td>
      <td>${element.employeeId}</td>
      <td>${element.email}</td>
    `;
  });
}

async function getElements() {
  const [companies, employees] = await Promise.all([
    fetchData(COMPANY_URL),
    fetchData(EMPLOYEE_URL)
  ]);
  populateCompanyTable(companies);
  populateEmployeeTable(employees);
}

getElements();

