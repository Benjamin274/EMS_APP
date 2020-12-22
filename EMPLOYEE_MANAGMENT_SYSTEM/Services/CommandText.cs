using EMPLOYEE_MANAGMENT_SYSTEM.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_APP.Services
{
    public class CommandText : ICommandText
    {
        public string GetEmployees => "SELECT Employee.Id, Employee.Name , CreatedAt ,Salary,Gender, Department.Name as DepartmentId FROM Employee INNER JOIN Department ON Department.Id = Employee.DepartmentId  Order By CreatedAt DESC";
        public string GetEmployeeById => "Select * From Employee Where Id= @Id";
        public string AddEmployee => "Insert Into  Employee (Name, Salary, Gender , DepartmentId) Values " +
            "(@Name, @Salary,@Gender, @DepartmentId)";
        public string UpdateEmployee => "Update Employee set Name = @Name, Salary = @Salary," +
            "Gender =@Gender,DepartmentId = @DepartmentId   Where Id =@Id";
        public string RemoveEmployee => "Delete From Employee Where Id= @Id";

        //Department Query
        public string GetDepartments => "Select * From Department";
        public string AddDepartment => "Insert Into  Department (Name) Values (@Name)";

        public string GetEmployeeByName => "searchEmployee";
    }
}
