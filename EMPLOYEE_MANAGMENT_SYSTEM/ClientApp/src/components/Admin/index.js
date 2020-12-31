import React, { useEffect } from "react";

import { AdminNav } from "./AdminNav";

export const AdminPage = () => {

  useEffect(() => {
    console.log('getting' , window.localStorage.getItem('user'))
  }, []);
  
  return (
    <div>
      <AdminNav />
    </div>
  );
}

