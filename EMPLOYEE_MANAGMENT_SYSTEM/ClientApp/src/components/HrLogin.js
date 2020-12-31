
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export const HrLogin = () => {
  const [employee, setEmployee] = useState({});
  async function signIn(event) {
    event.preventDefault()
    const response = await fetch('api/employee/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    if (response) {
      console.log("SUCCESSS")
      let data = await response.json();
      console.log('Data setting',data)
      window.localStorage.clear()
      window.localStorage.setItem('user',JSON.stringify(data));
      if (data.roleId == 1) {
        window.location.replace("/employee_page");
      }
      else
        {
          window.location.replace("/admin_page");
      }

    } else {
      alert("SOMETHING WENT WRONG")
    }
  }

  const set = name => {
    return ({ target: { value } }) => {
      setEmployee(oldValues => ({ ...oldValues, [name]: value }));
    }
  };


  useEffect(() => {

  }, []);
  return (
    <div className="row">
      <Form className="col-6 mx-auto" onSubmit={signIn} >
        <Form.Group >
          <Form.Label>Email address</Form.Label>
          <Form.Control value={employee.email} type="text" onChange={set('email')} placeholder="Enter email" />
        </Form.Group>
        <Form.Group >
          <Form.Label>Password</Form.Label>
          <Form.Control value={employee.password} onChange={set('password')} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
};
