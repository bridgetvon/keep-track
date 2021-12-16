const db = require('./db');
const inquirer = require('inquirer');
const { promise } = require('./db/connection');
const { viewDepartments } = require('./db');
require('console.table');



const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all employees', 
                'View all departments', 
                'View all roles', 
                'Add an employee',
                'Add a department', 
                'Add a role',
                'Update an employee role',
                'Fire an employee'
            ]
        }
    ]).then((response) => {
        const { options } = response;

        if  (response.options === 'View all employees') {
            viewEmployees();
        }
        if (response.options === 'View all departments') {
            viewDepartments()
        }
        if (response.options === 'View all roles') {
            viewRoles()
        }
        if (response.options === 'Add an employee') {
            addEmployee()
        }
        if (response.options === 'Add a department') {
            addDepartment()
        }
        if (response.options === 'Add a role') {
            addRole()
        }
        if (response.options === 'Update an employee') {
            updateEmployee()
        }
        if (response.options === 'Fire an employee') {
            fireEmployee()
        };
    }); 
};

promptUser();


function viewEmployees() {
    db.viewEmployees().then(([rows]) => {
        let employees = rows;
        console.table(employees);
        
    }).then(() => promptUser());
};

function addEmployee() {
  inquirer.prompt ([
      {
          name: 'first_name',
          message: 'What is your employees first name?'
      },
      {
          name: 'last_name',
          message: 'What is your employees last name?'
      }
  ])
  .then(res => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.viewRoles()
      .then(([rows]) => {
        let roles = rows;
        // map to gether employee roles from table 
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));

        inquirer.prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        })
          .then(res => {
            let roleId = res.roleId;

            db.viewEmployees()
              .then(([rows]) => {
                let employees = rows;
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id
                }));
                //unshift to add new elements to beginning of array 
                managerChoices.unshift({ name: "None", value: null });

                inquirer.prompt({
                  type: "list",
                  name: "managerId",
                  message: "Who is the employee's manager?",
                  choices: managerChoices
                })
                  .then(res => {
                    let employee = {
                      manager_id: res.managerId,
                      role_id: roleId,
                      first_name: firstName,
                      last_name: lastName
                    }

                    db.addEmployee(employee);
                  })
                  .then(() => console.log(
                    `Added ${firstName} ${lastName} to the database`
                  ))
                  .then(() => promptUser())
              })
          });
      });
  });
};

function addRole() {
    inquirer.prompt ([
        {
            name: 'newRole',
            message: 'What is the role you want to add?'
        },
        {
            name: 'newSalary',
            message: 'What is the salary of this role?'
        }
    ])
    .then(res => {
        let newRole = res.role.title;
        let newSalary = res.role.salary;

        db.viewRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
    })

})
};

// function viewDepartments() {
//     db.viewDepartments().then(([rows]) => {
//         let department = rows;
//         console.table(department);
        
//     }).then(() => promptUser());
// };

function addDepartment() {
    inquirer.prompt (
        {
            name: 'newDept',
            message: 'What is the name of the department you want to add?'
        }
    )
    .then( res => {
        let newDept = res.department.name;

        db.viewDepartments()
        newDept.unshift({ name: "None", value: null });

        console.log(viewDepartments());
    })

}

// function updateEmployee () {

// }

// function fireEmployee () {
    
// }



