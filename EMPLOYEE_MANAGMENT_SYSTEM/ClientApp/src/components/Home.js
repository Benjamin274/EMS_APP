import React, { useEffect, useState } from "react";

export default () => {
  const [item, setItem] = useState({});
  let [employees, SetEmployees] = useState([]);
  let [departments, SetDepartments] = useState([]);
  let [loading, SetLoading] = useState(false);

  useEffect(() => {
    console.log("Fetching Data ...");
    populateEmployeeData();
    populateDepartmentData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    addEmployee(item);
    populateEmployeeData();
  }
  const  handleDepartmentSubmit =(e)=>{
    e.preventDefault()
    addDepartment(item);
    populateDepartmentData();

  }
  async function addEmployee(data) {
    await fetch('api/employee', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  async function addDepartment(data) {
    await fetch('api/department', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }
  
  async function deleteEmployee(id) {
    const response = await fetch('api/employee/' + id, { method: 'DELETE' });
    alert("Delete", response)
    populateEmployeeData();
  }

  const set = name => {
    return ({ target: { value } }) => {
      setItem(oldValues => ({ ...oldValues, [name]: value }));
    }
  };

  async function populateEmployeeData() {
    SetLoading(true)
    const response = await fetch('api/employee', { method: 'GET' });
    const data = await response.json();
    SetEmployees(data);
    SetLoading(false)
  }
  async function populateDepartmentData() {
    SetLoading(true)
    const response = await fetch('api/department', { method: 'GET' });
    const data = await response.json();
    SetDepartments(data);
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
            employees.map((item,idx) =>
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.salary}</td>
                <td>{item.gender}</td>
                <td>{item.departmentId}</td>
                <td>{(new Date(item.createdAt)).toLocaleDateString()}</td>
                <td><button className="btn btn-primary" disabled={loading} onClick={() => { alert("Edit") }}>Edit</button></td>
                <td><button className="btn btn-danger" disabled={loading} onClick={() => { deleteEmployee(item.id) }}>Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }

  let contents = loading
    ? <p><em>Loading...</em></p>
    : renderForecastsTable(employees);
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h4>Add Employee</h4>
          <form className="form-group" onSubmit={handleSubmit} >
            <input name="name" onChange={set('name')} placeholder="Name" className="form-control" />

            <select name="departmentId" onChange={set('departmentId')} className="form-control">
              <option value="">Select Department</option>
              {departments.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
            </select>
            <select name="gender" onChange={set('gender')} className="form-control">
              <option value="">Select Gender</option>
              {["F", "M"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input name="salary" onChange={set('salary')} placeholder="salary" className="form-control" />
            <button type="submit" className="btn btn-secondary" disabled={loading}>Submit</button>
          </form>
        </div>
        <div className="col-6">
        <h4>Add Department</h4>
          <form className="form-group" onSubmit={handleDepartmentSubmit} >
            <input name="name" onChange={set('name')} placeholder="Department Name" className="form-control" />
           <button type="submit" className="btn btn-success" disabled={loading}>Submit</button>
          </form>
          </div>
      </div>
      {contents}
    </div>
  )
};
