﻿using EMPLOYEE_MANAGMENT_SYSTEM.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_APP.Services
{
    public class CommandText : ICommandText
    {
        public string GetEmployees => "SELECT Employee.Id,JobTitle ,Email,Password, Employee.Name , CreatedAt ," +
            "Salary,Gender, Department.Id as DepartmentId , Department.Name as DepartmentName FROM Employee " +
            "INNER JOIN Department ON Department.Id = Employee.DepartmentId  Order By CreatedAt DESC";
        public string GetEmployeeById => "Select * From Employee Where Id= @Id";
        public string AddEmployee => "Insert Into  Employee (Name, Salary, Gender," +
            "JobTitle,Email ,Password, DepartmentId) Values " +
            "(@Name, @Salary,@Gender,@JobTitle,@Email,@Password, @DepartmentId)";
        public string UpdateEmployee => "Update Employee set Name = @Name, Salary = @Salary," +
            "Gender = @Gender,DepartmentId = @DepartmentId ,JobTitle = @JobTitle ,Email = " +
            "@Email ,Password = @Password Where Id =@Id";
        public string RemoveEmployee => "Delete From Employee Where Id= @Id"; 

        public string GetEmployeeByName => "SearchEmployee";        
   
        public string getTeamMembers => "select * from VIEW_Team_Members where DepartmentId = @Id";        
   
        public string Login => "Select TOP 1 * From Employee Where Email = @Email and Password = @Password";
   
        //Department Query
        public string GetDepartments => "Select * From Department";
        public string GetDepartmentsWithManagerJoin => "Select Department.Id,Department.Name ,ManagerId,Employee.Name as ManagerName " +
            "  From Department   JOIN Employee On Employee.Id = Department.ManagerId";
        public string AddDepartment => "Insert Into  Department (Name) Values (@Name)";
        public string UpdateDepartment => "Update Department set ManagerId = @ManagerId Where Id =@Id";

 }
}
