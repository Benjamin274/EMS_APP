using EMS_APP.Models;
using EMS_APP.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMPLOYEE_MANAGMENT_SYSTEM.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public WeatherForecastController(IEmployeeRepository _employeeRepo)
        {
            _employeeRepository = _employeeRepo;
        }
        [HttpGet]
        public async Task<ActionResult<Employee>> Get()
        {
            return Ok(await _employeeRepository.GetAllEmployees());
        }
    }
}
