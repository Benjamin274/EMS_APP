import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home  from './components/Home';
import { HrLogin } from './components/HrLogin';
import  {EmployeeLogin} from './components/EmployeeLogin';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/employee_login' component={EmployeeLogin} />
        <Route path='/hr_login' component={HrLogin}/>
      </Layout>
    );
  }
}
