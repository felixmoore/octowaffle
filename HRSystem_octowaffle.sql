USE HRSystem_octowaffle;

DROP TABLE IF EXISTS Employee;

CREATE TABLE Employee (
    employee_id SMALLINT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    nin CHAR(9),
    department ENUM('HR', 'Finance', 'Sales Team', 'Talent Manager', 'Technical'),
    email VARCHAR(50),
    address VARCHAR(300),
    phone_number VARCHAR(15),
    sortcode CHAR(8),
    account_number CHAR(26),
    salary DECIMAL(7,2),
    PRIMARY KEY (employee_id)
);




DROP TABLE IF EXISTS Projects;

CREATE TABLE Projects (
    projects_id SMALLINT NOT NULL AUTO_INCREMENT,
    start_date DATE,
    end_date DATE,
    project_manager VARCHAR(70),
    description VARCHAR(300) NOT NULL,
    name VARCHAR(200) NOT NULL,
    customer_id SMALLINT NOT NULL,
    budget SMALLINT,
    PRIMARY KEY (projects_id)
);

DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (
    customer_id SMALLINT NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(50),
    contact VARCHAR(50),
    projects_id SMALLINT NOT NULL,
    PRIMARY KEY (customer_id),
    FOREIGN KEY (projects_id) REFERENCES Projects (projects_id)
);

DROP TABLE IF EXISTS Sales;

CREATE TABLE Sales
(
total_sales_monthly SMALLINT,
employee_id SMALLINT,
commission DECIMAL (10,2),
PRIMARY KEY (employee_id),
FOREIGN KEY (employee_id) REFERENCES Employee (employee_id)
);

DROP TABLE IF EXISTS Technical;

CREATE TABLE Technical 
(
employee_id SMALLINT,
projects_id SMALLINT,
cv VARCHAR (300),
passport_photo BLOB,
PRIMARY KEY (employee_id),
FOREIGN KEY (projects_id) REFERENCES Projects (projects_id),
FOREIGN KEY (employee_id) REFERENCES Employee (employee_id)
);



insert into Employee (employee_id, first_name, last_name, nin, department, email, address, phone_number, salary) 
VALUES (1, 'Aimee', 'Boyle', 123456789, 'Technical', 'aimee@email.com', 'Some Adress 11, City, 12345', '+441231231234' , 30000);

insert into Employee (employee_id, first_name, last_name, nin, department, email, address, phone_number, salary) 
VALUES (2, 'Sylwia', 'Łuczak-Jagieła', 987654321, 'HR', 'sylwia@email.com', 'My Adress 22, City, 54321', '+48987987987', 30000 );

insert into Employee (employee_id, first_name, last_name, nin, department, email, address, phone_number, salary) 
VALUES (3, 'Adam', 'Jones', 999888777, 'Sales Team', 'adam@email.com', 'Adam Adress 33, Oxford, 33333', '+441111444666', 30000 );
insert into Sales (total_sales_monthly, employee_id, commission) values (20, 3, 3.3);
insert into Employee (employee_id, first_name, last_name, nin, department, email, address, phone_number, salary) 
VALUES (5, 'John', 'Doe', 666555666, 'Talent Manager', 'john@email.com', 'John Adress 4D, London, 23232', '+441888666444', 30000 );

insert into Employee (employee_id, first_name, last_name, nin, department, email, address, phone_number, salary) 
VALUES (4, 'Zoe', 'Jackson', 777333111, 'Finance', 'zoe@email.com', 'Zoe Adress 433d/4, Leeds, 23232', '+441236543335', 30000 );



