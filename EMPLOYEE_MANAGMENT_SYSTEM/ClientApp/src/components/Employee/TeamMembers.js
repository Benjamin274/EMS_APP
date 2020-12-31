import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const TeamMembers = () => {
  let [employees, SetEmployees] = useState([]);

  useEffect(() => {
      let user = JSON.parse(window.localStorage.getItem('user'));

    fetchTeam(user.departmentId)  
  },[]);
    async function fetchTeam(id) {
        const response = await fetch('api/employee/team/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        SetEmployees(data)
  }

  return (
    <div className="container">
      <div className="row">
              {
                  employees.map(e => 
                      <div className="card col-sm-6" >
                          <div className="card-body">
                              <h4> {e.name}</h4>
                              <h5> {e.jobTitle}</h5>
                              <a href="#" className="btn btn-primary">{ e.email }</a>

                              </div>
                              </div>
                  )
              }
      </div>
    </div>
  )
};
