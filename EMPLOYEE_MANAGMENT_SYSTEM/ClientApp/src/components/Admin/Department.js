import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const  EmployeeTable =  () => {
  let [departments, SetDepartments] = useState([]);
  let [modalDeptShow, setModalDeptShow] = useState(false);

  useEffect(() => {
    populateDepartmentData();
  }, []);

  async function handleDepartmentSubmit(e) {
    e.preventDefault()
    await addDepartment(item);
    populateDepartmentData();
    setModalDeptShow(false);
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

  const set = (name) => (e) => {
    e.preventDefault();
    console.log(e.target.value)
    item[name] = e.target.value;
  };

  async function populateDepartmentData() {
    SetLoading(true)
    const response = await fetch('api/department', { method: 'GET' });
    const data = await response.json();
    SetDepartments(data);
    SetLoading(false)
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
            <input name="name"  
            onChange={set('name')}  
            className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>Department:
        <select name="departmentId"  onChange={set('departmentId')} className="form-control">
                  <option value="">Select Department</option>
                  {departments.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </select>
              </label>

            </div>
            <div className="form-group">
              <label>Gender:
        <select name="gender"  onChange={set('gender')} className="form-control">
                  <option value="">Select Gender</option>
                  {["F", "M"].map(c => <option value={c} key={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>Salary:
            <input name="salary"  onChange={set('salary')}  className="form-control" />
              </label>

            </div>
            <div className="form-group">
              <label>Job Title:
            <input name="jobTitle"
             onChange={set('jobTitle')} value="Job Title" className="form-control" />
              </label>

            </div>
            <div className="form-group">
              <label>Email:
            <input name="email" onChange={set('email')}
                  className="form-control" />
              </label>

            </div>
            <div className="form-group">
              <label>Password:
            <input name="password" onChange={set('password')}
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 text-center" >
        <DepartmentAddModal
          show={modalDeptShow}
          onHide={() => setModalDeptShow(false)}
        />
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Gender</th>
              <th>Job</th>
              <th>Depeartment Name</th>
              <th>Hired Date </th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              departments.map((item, idx) =>
                <tr key={idx}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>   <Button variant="primary" onClick={() => { setItem(item); setModalDeptShow(true); }}>Edit </Button></td>
                  <td><button className="btn btn-danger" disabled={loading} onClick={() => { deleteEmployee(item.id) }}>Delete</button></td>
                </tr>
              )

            }
          </tbody>
        </table>
        </div>
      </div>
      {contents}
    </div>
  )
};
