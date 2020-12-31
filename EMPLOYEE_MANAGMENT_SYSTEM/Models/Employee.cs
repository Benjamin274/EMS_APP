using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EMS_APP.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string JobTitle { get; set; }
        public char Gender { get; set; }
        public int  RoleId { get; set; }
        public double Salary { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
