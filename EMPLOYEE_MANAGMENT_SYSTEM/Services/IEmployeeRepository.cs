using EMS_APP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_APP.Services
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllEmployees();
        ValueTask<Employee> GetById(int id);
        Task<IEnumerable<Employee>> GetByName(string name);
        ValueTask<Employee> Login(Employee e);
        Task AddEmployee(Employee entity);
        Task UpdateEmployee(Employee entity, int id);
        Task RemoveEmployee(int id);


        //Departement Operations
        Task<IEnumerable<Department>> GetAllDepartments();
        Task<IEnumerable<Department>> GetAllDepartmentsWithManager();
        Task AddDepartement(Department entity);
        Task UpdateDepartement(Department entity);
    }
}
