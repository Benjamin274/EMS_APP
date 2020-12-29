
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

export const HrLogin = () => {
  const [employee, setEmployee] = useState({});
  const signIn = (event) => {
    event.preventDefault()
    fetch('api/employee/login',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    .then(response=>{
      if(response.status === 200) {
        console.log("SUCCESSS") 
        console.log(response) 
        window.location.replace("/admin_page");
        
    }else {
        console.log("SOMETHING WENT WRONG")
    }

    })
    .catch(err=>{
      console.log("Error:",err)
    })
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
          Submit
        </Button>
      </Form>
    </div>
  )
};
