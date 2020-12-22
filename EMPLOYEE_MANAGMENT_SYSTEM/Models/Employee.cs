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
        public string Name { get; set; }
        public char Gender { get; set; }
        public double Salary { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
