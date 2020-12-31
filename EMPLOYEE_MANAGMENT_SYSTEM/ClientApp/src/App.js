import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home  from './components/Home';
import { HrLogin } from './components/HrLogin';
import  {AdminPage} from './components/Admin/index';
import  {EmployeePage} from './components/Employee/index';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/admin_page' component={AdminPage} />
        <Route path='/employee_page' component={EmployeePage}/>
        <Route path='/hr_login' component={HrLogin}/>
      </Layout>
    );
  }
}
