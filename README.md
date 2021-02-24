# Employee Tracking Interface

![html](https://img.shields.io/github/languages/top/jxhnkndl/employee-tracker?style=plastic)
![commit](https://img.shields.io/github/last-commit/jxhnkndl/employee-tracker?style=plastic)
![license](https://img.shields.io/static/v1?label=license&message=MIT&color=orange&style=plastic)


## Table of Contents
* [Description](#description)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Application Demo](#application-demo)
* [License](#license)
* [Contact](#contact)


## Description
The Employee Tracking Interface is a command line application that offers business owners a
user-friendly way of managing their employee, role, and department records. Using Node.js and Inquirer.js to power the application and a MySQL database to store and organize the company data, the interface is built around a series of command line prompts that guide users through the process of viewing records, creating records, deleting records, and updating an employee's role or manager.


## Technologies
**Core Technologies:**  
Node.js, JavaScript, Inquirer.js, MySQL

**Supplmentary Packages:**  
console.table


## Installation
This application requires Node.js and npm to run. To check whether Node.js and npm are installed locally, run:
```
node -v
```
```
npm -v
```
If Node and npm are already installed, the commands above should return version numbers. Visit [Node.js](http://www.nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for full installation details and documentation.  

The Employee Tracking Interface also requires the installation of three third-party modules including `inquirer`, `mysql`, and `console.table`.  

To install the project and its npm dependencies, navigate to the project's root directory and run:
```
npm install
```
Once all third-party packages have been successfully installed, the application is ready to use. For more details, reference the application's `package.json` file.


## Usage
To launch the application from the command line, navigate to the project's root directory and run:

```
node index.js
```


The application's user journey is centered around a menu of actions:

![Preview-1](assets/screenshots/)

Each action invokes a query that creates, reads, updates, or deletes data from the database. When the action creates, updates, or deletes data from the database, the application returns an updated view of the data's parent table. Additionally, changes to records are dynamically reflected in command line prompt choices. For example, creating a new employee will automatically add that employee to the lists of employees presented to users in other prompts:

![Preview-2](assets/screenshots/)


## Application Demo
The following video documents the core functionality of the Employee Tracking Interface. Use this video to supplement the documentation above: 

[![Application Preview](assets/demo-gifs/team-profile-generator-demo.gif)](https://drive.google.com/file/d/1nJ2gbuWn2ufELPXuDB2jVWeGVIfOp53m/view)


## License
Copyright (c) 2021 J.K. Royston  
Licensed under the [MIT License](https://opensource.org/licenses/MIT).


## Contact
J.K. Royston  
<jkroyston@gmail.com>  
[GitHub](https://www.github.com/jxhnkndl)