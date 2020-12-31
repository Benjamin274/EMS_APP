import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
export const Managers = () => {
  let [item, setItem] = useState({});
  let [managers, setManagers] = useState([]);
  let [departments, setDepartments] = useState([]);
  let [employees, setEmployees] = useState([]);
  let [modalShow, setManagerModalShow] = useState(false);
  async function populateDepartmentData() {
    const depts = await fetch('api/department', { method: 'GET' });
    const mgrs = await fetch('api/department/managers', { method: 'GET' });
    const epys = await fetch('api/employee', { method: 'GET' });
     var data = await depts.json();
     setDepartments(data);
     data = await epys.json();
     setEmployees(data);
     data = await mgrs.json();
     console.log("Managers",mgrs,data)
     setManagers(data);
  }
  async function handleManagerSubmit(){
    console.log(item)
    const allowed = ['id', 'managerId'];
const filtered = Object.keys(item)
  .filter(key => allowed.includes(key))
  .reduce((obj, key) => {
    obj[key] = item[key];
    return obj;
  }, {});

  console.log('filtered',filtered)
    await fetch('api/department', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(filtered)
    });
    setModalShow(false)
  }
  const set = (name) => (e) => {
    e.preventDefault();
    console.log(e.target.value)
    console.log(item)
    item[name] = e.target.value;
  };
  function setModalShow(b){
    setManagerModalShow(b)
  }

  useEffect(() => {
    populateDepartmentData();
  }, []);
  
  function ADDMANAGER(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title 
          id="contained-modal-title-vcenter">
            Assign | Update Manager
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form   >
            <div className="form-group">
              <label>Set Manager:
        <select  onChange={set('managerId')} className="form-control">
                  <option value="">Select Manager</option>
                  {employees.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
                </select>
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleManagerSubmit} className="btn btn-secondary" >Submit</button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <div className="container">
        <h3 className="text-center">Departments Table</h3>
         <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Number Of Employees Under Department</th>
            </tr>
          </thead>
          <tbody>
            {
              departments.map((i, idx) =>
                <tr key={idx}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>
                  <Button variant="primary" onClick={() => { setItem({...item,id:i.id}); setModalShow(true); }}>
                    Assign Manager </Button>
                  </td>
                  
                  </tr>
              )

            }
          </tbody>
          <ADDMANAGER
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </table>
        <h3 className="text-center">Managers Table</h3>
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>#</th>
              <th>Manger Name</th>
              <th>Department Name</th>
              {/* <th>Number Of Employees Under Department</th> */}
            </tr>
          </thead>
          <tbody>
            {
              managers.map((i, idx) =>
                <tr key={idx}>
                  <td>{i.id}</td>
                  <td>{i.managerName}</td>
                  <td>{i.name}</td>
                  </tr>
              )

            }
          </tbody>
        </table>
      </div>
    );
  }
  