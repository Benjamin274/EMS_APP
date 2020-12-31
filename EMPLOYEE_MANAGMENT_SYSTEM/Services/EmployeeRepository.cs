using EMS_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Threading.Tasks;
using EMPLOYEE_MANAGMENT_SYSTEM.Services;
using System.Data;

namespace EMS_APP.Services
{
    public class EmployeeRepository:BaseRepository,IEmployeeRepository
    {
        private readonly ICommandText _commandText;

        public EmployeeRepository(IConfiguration configuration, ICommandText commandText) : base(configuration)
        {
            _commandText = commandText;

        }

        //get All Employees with department name 
        public async Task<IEnumerable<Employee>> GetAllEmployees()
        {

            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Employee>(_commandText.GetEmployees);
                return query;
            });

        }

        //get an employee by Id

        public async ValueTask<Employee> GetById(int id)
        {
            return await WithConnection(async conn =>
            {
                var query = await conn.QueryFirstOrDefaultAsync<Employee>(
                    _commandText.GetEmployeeById, 
                    new { Id = id });
                return query;
            });

        }

        //Add An Employee
            public async Task AddEmployee(Employee entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.AddEmployee,
                    new { 
                        Name = entity.Name, 
                        Salary = entity.Salary,
                        Gender = entity.Gender,
                        DepartmentId = entity.DepartmentId,
                        JobTitle = entity.JobTitle,
                        Email = entity.Email,
                        Password = entity.Password
                    });
            });

        }

        //Update Employee Information
        public async Task UpdateEmployee(Employee entity, int id)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.UpdateEmployee,
                    new {
                        Id = id,
                        Name = entity.Name,
                        Salary = entity.Salary,
                        Gender = entity.Gender,
                        DepartmentId = entity.DepartmentId,
                        JobTitle = entity.JobTitle,
                        Email = entity.Email,
                        Password = entity.Password
                    });
            });

        }


        //Remove employee
        public async Task RemoveEmployee(int id)
        {

            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.RemoveEmployee, new { Id = id });
            });

        }


        //Get All departments from database

        public async Task<IEnumerable<Department>> GetAllDepartments()
        {

            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Department>(_commandText.GetDepartments);
                return query;
            });

        }
        //Get All departments from database with Managers Joined
        public async Task<IEnumerable<Department>> GetAllDepartmentsWithManager()
        {

            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Department>(_commandText.GetDepartmentsWithManagerJoin);
                return query;
            });

        }

        //Add Department

        public async Task AddDepartement(Department entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.AddDepartment,
                    new { Name = entity.Name});
            });
        }


        public async  Task<IEnumerable<Employee>> GetByName(string name)
        {
            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Employee>(_commandText.GetEmployeeByName,new {strFind = name },commandType:CommandType.StoredProcedure);
                return query;
            });
        }
        public async  Task<IEnumerable<Employee>> getTeamMembers(int id)
        {
            return await WithConnection(async conn =>
            {
                var query = await conn.QueryAsync<Employee>(  _commandText.getTeamMembers,new {Id = id });
                return query;
            });
        }
        

        //returns an Employee with the given entity from 
        public async ValueTask<Employee> Login(Employee entity)
        {
            return await WithConnection(async conn =>
            {
                return await conn.QueryFirstOrDefaultAsync<Employee>(
                    _commandText.Login, new { Email = entity.Email, 
                    Password = entity.Password });
            });
        }

        public async  Task UpdateDepartement(Department entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.UpdateDepartment,
                    new
                    {
                        Id = entity.Id,
                        ManagerId = entity.ManagerId
                    });
            }); 
        }
    }
}
