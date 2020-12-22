using EMS_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Threading.Tasks;
using EMPLOYEE_MANAGMENT_SYSTEM.Services;

namespace EMS_APP.Services
{
    public class EmployeeRepository:BaseRepository,IEmployeeRepository
    {
        private readonly ICommandText _commandText;

        public EmployeeRepository(IConfiguration configuration, ICommandText commandText) : base(configuration)
        {
            _commandText = commandText;

        }
        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {

            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Employee>(_commandText.GetEmployees);
                return query;
            });

        }
        public async ValueTask<Employee> GetById(int id)
        {
            return await WithConnection(async conn =>
            {
                var query = await conn.QueryFirstOrDefaultAsync<Employee>(_commandText.GetEmployeeById, new { Id = id });
                return query;
            });

        }

        public async Task AddEmployee(Employee entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.AddEmployee,
                    new { Name = entity.Name, Salary = entity.Salary, Gender = entity.Gender, DepartmentId = entity.DepartmentId });
            });

        }
        public async Task UpdateEmployee(Employee entity, int id)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.UpdateEmployee,
                    new { Name = entity.Name, Salary = entity.Salary , Gender = entity.Gender ,DepartmentId = entity.DepartmentId, Id = id });
            });

        }

        public async Task RemoveEmployee(int id)
        {

            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.RemoveEmployee, new { Id = id });
            });

        }

        public async Task AddDepartement(Department entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.AddDepartment,
                    new { Name = entity.Name});
            });
        }

        public async Task<IEnumerable<Department>> GetAllDepartments()
        {

            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Department>(_commandText.GetDepartments);
                return query;
            });

        }
    }
}
