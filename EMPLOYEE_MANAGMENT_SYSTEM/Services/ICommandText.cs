using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMPLOYEE_MANAGMENT_SYSTEM.Services
{
    public interface ICommandText
    {
        string GetEmployees { get; }
        string GetEmployeeById { get; }
        string AddEmployee { get; }
        string UpdateEmployee { get; }
        string RemoveEmployee { get; }


        //dEPArtment 
        string AddDepartment { get; }
        string GetDepartments { get; }
    }
}
