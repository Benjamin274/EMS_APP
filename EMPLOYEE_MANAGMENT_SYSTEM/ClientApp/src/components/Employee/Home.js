import React, { useEffect, useState } from "react";

export const Home = () => {
  const [employee,setEmployee] = useState({});
  
  useEffect(() => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    setEmployee(user)
  }, []);
  return (
    <div className="container">
      <div className="card text-center">
  <div className="card-header">
    {employee.name}
  </div>
  <div className="card-body">
    <h5 className="card-title"> {employee.name} </h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  <div className="card-footer text-muted">
    Since {employee.createdAt }
  </div>
</div>
    </div>
  )
};
