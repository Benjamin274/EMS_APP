import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default () => {
  const [item, setItem] = useState({});
  const [search, setSearch] = useState('')
  let [employees, SetEmployees] = useState([]);
  let [departments, SetDepartments] = useState([]);
  let [loading, SetLoading] = useState(false);
  const [modalShow, setModal] = useState(false);
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalDeptShow, setModalDeptShow] = useState(false);

  useEffect(() => {
    console.log("Fetching Data ...");
    populateEmployeeData();
    populateDepartmentData();
  }, []);

  function setModalShow(bool){
    if(!bool)
    setItem({});
    setModal(bool);
  }
  async function handleSubmit(event) {
    event.preventDefault()
    alert("You have added Employee")
    await addEmployee(item);
    populateEmployeeData();
  }
  async function handleDepartmentSubmit(e) {
    e.preventDefault()
    SetLoading(true)
    await addDepartment(item);
    SetLoading(false)
    populateDepartmentData();
    setModalDeptShow(false);
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
    if (name) {
      const response = await fetch('api/employee/search/' + name, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      });
      const data = await response.json();
      if (data.length)
        SetEmployees(data)
    }
    else {
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
  async function handleEditEmployee() {
    console.log(item)

  }


  async function deleteEmployee(id) {
    await fetch('api/employee/' + id, { method: 'DELETE' });
    alert("Delete an Employee")
    populateEmployeeData();
  }

  const set = (name) =>(e) => {
    e.preventDefault();
    item[name]=e.target.value;
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
  function EmployeeAddModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add  Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form   >
          
            <div className="form-group">

              <label>Name:
              <input name="name" onChange={set('name')} placeholder="Name" className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>Department:
              <select name="departmentId" onChange={set('departmentId')} className="form-control">
              <option value="">Select Department</option>
              {departments.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
            </select>
              </label>

            </div>
            <div className="form-group">
              <label>Gender:
              <select name="gender" onChange={set('gender')} className="form-control">
              <option value="">Select Gender</option>
              {["F", "M"].map(c => <option key={c}>{c}</option>)}
            </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Salary:<input name="salary" onChange={set('salary')} placeholder="salary" className="form-control" />
             </label>

            </div>
            <div className="form-group">
              <label>Job Title:
              <input name="jobTitle" onChange={set('jobTitle')} placeholder="Job Title" className="form-control" />
              </label>

            </div>
            <div className="form-group">
              <label>Password:<input name="password" onChange={set('password')} placeholder="Default Password" className="form-control" />
              </label>
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={handleSubmit} className="btn btn-secondary" disabled={loading}>Submit</button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function DepartmentAddModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add  Department 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="form-group" >
            <input name="name" onChange={set('name')} placeholder="Department Name" className="form-control" />
          </form>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={handleDepartmentSubmit} className="btn btn-success" disabled={loading}>Submit</button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function EmployeeEditModal(props) {
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
          <form  >
            <div className="form-group">
              <label>Name:
            <input name="name" value={item.name} onChange={set('name')} placeholder="Name" className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>Department:
        <select name="departmentId" value={item.departmentId} onChange={set('departmentId')} className="form-control">
                  <option value="">Select Department</option>
                  {departments.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </select>
              </label>

            </div>
            <div className="form-group">
              <label>Gender:

        <select name="gender" value={item.gender} onChange={set('gender')} className="form-control">
                  <option value="">Select Gender</option>
                  {["F", "M"].map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>Salary:
            <input name="salary" value={item.salary} onChange={set('salary')} placeholder="salary" className="form-control" />
              </label>

            </div>
            <div className="form-group">
              <label>Job Title:
            <input name="jobTitle" onChange={set('jobTitle')} placeholder="Job Title" className="form-control" />
              </label>

            </div>
            <div className="form-group">
              <label>Password:
            <input name="password" onChange={set('password')}
                  value={item.password}
                  className="form-control" />
              </label>

            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="btn btn-secondary"
            onClick={handleEditEmployee}
            disabled={loading}
          >Update</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //table rendering function 
  function renderForecastsTable(employees) {
    return (
      <>
        <EmployeeEditModal
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
              <th>Job</th>
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
                  <td>{item.jobTitle}</td>
                  <td>{item.departmentId}</td>
                  <td>{(new Date(item.createdAt)).toLocaleDateString()}</td>
                  <td>   <Button variant="primary" onClick={() => { setItem(item); setModalShow(true); }}>Edit </Button></td>
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
        <div className="col-6 text-center" >
        <Button variant="primary" onClick={() => { setModalAddShow(true); }}>Add Employee </Button>
        <EmployeeAddModal
          show={modalAddShow}
          onHide={() => setModalAddShow(false)}
           />
        </div>
        <div className="col-6 text-center">
        <Button variant="primary" onClick={() => { setModalDeptShow(true); }}>Add Department </Button>
        <DepartmentAddModal
          show={modalDeptShow}
          onHide={() => setModalDeptShow(false)}
           />

        </div>
        <div className="col-12 text-center my-2">
          <div className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee By Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
          <button onClick={searchEmployee} className="btn btn-primary"
            disabled={loading}>Search</button>
            </  div>
        </div>
      </div>
      {contents}
    </div>
  )
};
