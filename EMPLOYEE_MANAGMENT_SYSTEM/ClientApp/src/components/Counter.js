import React, { useEffect, useState } from "react";

export default () => {
  const [employee, setEmployee] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Employee", employee)
  }

  const set = name => {
    return ({ target: { value } }) => {
      setEmployee(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  let [employees, SetEmployees] = useState([]);
  let [loading, SetLoading] = useState(true);
  async function populateWeatherData() {
    const response = await fetch('api/employee');
    const data = await response.json();
    console.log(data);
    SetEmployees(data);
    SetLoading(false)
  }

  //table rendering function 
  function renderForecastsTable(employees) {
    return (

      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Gender</th>
            <th>Depeartment</th>
            <th>Hired Date </th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map(item =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.salary}</td>
                <td>{item.gender}</td>
                <td>{item.departmentId}</td>
                <td>{(new Date(item.createdAt)).toLocaleDateString()}</td>
                <td><button className="btn btn-primary" onClick={() => { alert("Edit") }}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={() => { alert("Delete") }}>Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    // populatePayrollData();
  }, []);
  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderForecastsTable(employees);
  return (
    <div className="container">
      {contents}
    </div>
  )
};
