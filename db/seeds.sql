USE employee_cms;

INSERT INTO departments (name)
VALUES ("Production"),
       ("Engineering"),
       ("Sales"),
       ("Accounting"),
       ("HR");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 90000, 1),
        ("Engineer", 80000, 2),
        ("Salesperson", 70000, 3),
        ("Accountant", 70000, 4),
        ("HR person", 90000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Park", 20, NULL),
        ("Steve", "Stevens", 21, 100),
        ("Camelia","Camerons", 22, 100),
        ("Brad", "Lee", 23, 100),
        ("Mil", "Ton", 24, 100);