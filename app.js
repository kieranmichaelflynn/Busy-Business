const inquirer = require('inquirer');
const { getDepartments, createDepartment } = require('./operations/department');
// import helper functions and other things


function askUser() {
    return inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee's role",
                "Exit"
            ],
            name: "option"
        },
        {
            type: "input",
            name: "newDepartmentName",
            message: "What is the department name?",
            when: (answers) => answers.option === "Add a department"
        },
        {
            type: "input",
            name: "newRoleName",
            message: "What is the role name?",
            when: (answers) => answers.option === "Add a role"
        },
        {
            type: "input",
            name: "newRoleSalary",
            message: "What is the role's salary?",
            when: (answers) => answers.option === "Add a role"
        },
        {
            type: "input",
            name: "newRoleDepartment",
            message: "What is the role's department?",
            when: (answers) => answers.option === "Add a role"
        },
        {
            type: "input",
            name: "newEmployeeFirst",
            message: "What is the employee's first name?",
            when: (answers) => answers.option === "Add an employee"
        },
        {
            type: "input",
            name: "newEmployeeLast",
            message: "What is the employee's last name?",
            when: (answers) => answers.option === "Add an employee"
        },
        {
            type: "input",
            name: "newEmployeeRole",
            message: "What is the employee's role?",
            when: (answers) => answers.option === "Add an employee"
        },
        {
            type: "input",
            name: "newEmployeeManager",
            message: "Who is the employee's manager?",
            when: (answers) => answers.option === "Add an employee"
        },
        {
            type: "input",
            name: "updateEmployee",
            message: "What is the employee's name?",
            when: (answers) => answers.option === "Update an employee's role"
        },
        {
            type: "input",
            name: "updateEmployeeRole",
            message: "What is the employee's new role?",
            when: (answers) => answers.option === "Update an employee's role"
        },
    ]).then(async (ans) => {

        if (ans.option === "Exit") {
            process.exit(0);
        }

        if (ans.option === "View all departments") {
            const results = await getDepartments();
            console.table(results);
            // getDepartments function finds all departments and displays them on a simple table
        }
        if (ans.option === "View all roles") {
            const results = getRoles();
            console.table(results);
            // getRoles function finds all roles and displays them on a simple table
        }
        if (ans.option === "View all employees") {
            const results = getEmployees();
            console.table(results);
            // getEmployees function finds all employees and displays them on a simple table
        }

        if (ans.option === "Add a department") {
            await createDepartment(ans.newDepartmentName);
            console.log("New Department added!")
            // addDepartment function adds a department
        }
        if (ans.option === "Add a role") {
            await addRole();
            // addRole function adds a role
        }
        if (ans.option === "Add an employee") {
            await askEmployee();
            // addEmployee function adds an employee
        }
        if (ans.option === "Update an employee's role") {
            await updateEmployee();
            // updateEmployee function finds a specific employee and updates their role
        }
        askUser()
    });
}

askUser();



