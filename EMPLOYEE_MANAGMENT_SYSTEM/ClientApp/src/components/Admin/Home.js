import React, { useEffect, useState } from "react";
export const Home = () => {
  const [e,setE] = useState([]);
  const [d,setD] = useState([]);
  
  useEffect(() => {
    populateEmployeeData();
  }, []);
  async function populateEmployeeData() {
    const e = await fetch('api/employee', { method: 'GET' });
    const dataE = await e.json();
    const d = await fetch('api/department', { method: 'GET' });
    const dataD = await d.json();
    setE(dataE);
    setD(dataD);
  }
  return (
    <main class="px-3">
    <h1>Your Organization Has .</h1>
    <p class="lead">{ e.length} Employees.</p>
    <p class="lead">{ d.length} Departments.</p>
  </main>
  )
  }
  