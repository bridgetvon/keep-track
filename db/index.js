const connection = require('./connection');


class Db {
    constructor(connection){
        this.connection = connection;
    }
    //find all employees 
    viewEmployees() {
        return this.connection.promise().query(
                  "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
             
        );
            }
        
        //create new employee 
        addEmployee(employee) {

            return this.connection.promise().query("INSERT INTO employee SET ?", employee);
          }

        // Update the given employee's role
        updateEmployee(employeeId, roleId) {
        return this.connection.promise().query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
         [roleId, employeeId]
        );
        }
        // Find all roles, join with departments to display the department name
        viewRoles() {
            return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
            );
        }

        // Create a new role
        addRole(role) {
            return this.connection.promise().query("INSERT INTO role SET ?", role);
        }

        viewDepartments() {
            return this.connection.promise().query(
              "SELECT department.id, department.name FROM department;"
            );
          }

          addDepartment(department) {
            return this.connection.promise().query("INSERT INTO department SET ?", department);
          }

         // Remove an employee with the given id
            fireEmployee(employeeId) {
            return this.connection.promise().query(
             "DELETE FROM employee WHERE id = ?",
             employeeId
    );
     


    }

    }


    module.exports = new Db(connection);