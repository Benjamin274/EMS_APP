import React, { useEffect, useState } from "react";
import  {Button,Modal } from "react-bootstrap";

export default () => {
  const [item, setItem] = useState({});
  const [search, setSearch] = useState('')
  let [employees, SetEmployees] = useState([]);
  let [departments, SetDepartments] = useState([]);
  let [loading, SetLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    console.log("Fetching Data ...");
    populateEmployeeData();
    populateDepartmentData();
  }, []);

  async function handleSubmit (event) {
    event.preventDefault()
    alert("You have added Employee")
    await addEmployee(item);
    populateEmployeeData();
  }
  async function handleDepartmentSubmit (e) {
    e.preventDefault()
    SetLoading(true)
    await addDepartment(item);
    SetLoading(false)
    populateDepartmentData();

  }
  async function searchEmployee() {
    console.log(search)
    searchEmployeeByName(search)
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
  async function searchEmployeeByName(name) {
    if(name){
      const response = await fetch('api/employee/search/' + name, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      });
      const data = await response.json();
      if(data.length)
      SetEmployees(data)
    }
  else{
    populateEmployeeData()
  }
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
     await fetch('api/employee/' + id, { method: 'DELETE' });
    alert("Delete an Employee")
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
    console.log("Employees:", data)
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
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="form-group" onSubmit={handleSubmit} >
            <input name="name" value={item.name} onChange={set('name')} placeholder="Name" className="form-control" />

            <select name="departmentId" value={item.departmentId} onChange={set('departmentId')} className="form-control">
              <option value="">Select Department</option>
              {departments.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
            </select>
            <select name="gender" value={item.gender}  onChange={set('gender')} className="form-control">
              <option value="">Select Gender</option>
              {["F", "M"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input name="salary" value={item.salary} onChange={set('salary')} placeholder="salary" className="form-control" />
            <button type="submit" className="btn btn-secondary" disabled={loading}>Submit</button>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

  //table rendering function 
  function renderForecastsTable(employees) {
    return (
      <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
            employees.map((item, idx) =>
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.salary}</td>
                <td>{item.gender}</td>
                <td>{item.departmentId}</td>
                <td>{(new Date(item.createdAt)).toLocaleDateString()}</td>
                <td>   <Button variant="primary" onClick={() => setModalShow(true)}>Edit </Button></td>
                <td><button className="btn btn-danger" disabled={loading} onClick={() => { deleteEmployee(item.id) }}>Delete</button></td>
              </tr>
            )
            
          }
        </tbody>
      </table>
      </>
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
        <div className="col-12 d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee By Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchEmployee} className="btn btn-primary" 
           disabled={loading}>Search</button>
        </div>
      </div>
      {contents}
    </div>
  )
};
