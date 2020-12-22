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
    public class DepartmentController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public DepartmentController(IEmployeeRepository _employeeRepo)
        {
            _employeeRepository = _employeeRepo;
        }

        [HttpPost]
        public async Task<ActionResult> AddDepartment(Department entity)
        {
            await _employeeRepository.AddDepartement(entity);
            return Ok(entity);
        }
        [HttpGet]
        public async Task<ActionResult<Department>> GetAllDepartment()
        {
            return Ok(await _employeeRepository.GetAllDepartments());
        }
    }
}
