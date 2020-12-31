import React, { useEffect, useState } from "react";

import { TeamMembers } from "./TeamMembers";
import {Home} from "./Home";
import {Managers} from "./Managers";

import { Tabs,Tab } from "react-bootstrap";
export const AdminNav = () => {
    const [key, setKey] = useState('home');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="home" title="Home">
          <Home />
        </Tab>
        <Tab eventKey="profile" title="Team Members">
                <TeamMembers />
        </Tab>
      </Tabs>
    );
  }
  