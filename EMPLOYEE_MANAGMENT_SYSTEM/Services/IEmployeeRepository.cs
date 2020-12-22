using EMS_APP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_APP.Services
{
    public interface IEmployeeRepository
    {
        ValueTask<Employee> GetById(int id);
        Task AddEmployee(Employee entity);
        Task UpdateEmployee(Employee entity, int id);
        Task RemoveEmployee(int id);
        Task<IEnumerable<Employee>> GetAllEmployees();

        //Departement Operations
        Task<IEnumerable<Department>> GetAllDepartments();
        Task AddDepartement(Department entity);
    }
}
