using EMS_APP.Models;
using EMS_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMPLOYEE_MANAGMENT_SYSTEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository _employeeRepo)
        {
            _employeeRepository = _employeeRepo;
        }
        [HttpGet]
        public async Task<ActionResult<Employee>> GetAll()
        {
            return Ok(await _employeeRepository.GetAllEmployees());
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(Employee entity)
        {
            await _employeeRepository.AddEmployee(entity);
            return Ok(entity);
        }
        
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Employee>> GetById(int id)
        {
            var employee = await _employeeRepository.GetById(id);
            return Ok(employee);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Update(Employee entity, int id)
        {
            await _employeeRepository.UpdateEmployee(entity, id);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _employeeRepository.RemoveEmployee(id);
            return Ok();
        }
         [HttpGet("team/{id}")]
        public async Task<ActionResult<Employee>> TeamView(int  id)
        {
            var employee = await _employeeRepository.getTeamMembers(id);
            return Ok(employee);
        }

        [HttpGet("search/{name}")]
        public async Task<ActionResult<Employee>> GetByName(string name)
        {
            var employee = await _employeeRepository.GetByName(name);
            return Ok(employee);
        }


        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<Employee>> Login(Employee entity)
        {
            return Ok(await _employeeRepository.Login(entity));
        }

    }
}
