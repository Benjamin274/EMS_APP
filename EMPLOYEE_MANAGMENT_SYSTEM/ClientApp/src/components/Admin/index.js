import  React  from "react";

import {AdminNav} from "./AdminNav";

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  
  export const Index = () => {
    return (
      <div>
        <AdminNav />
        </div>
    );
  }
  
