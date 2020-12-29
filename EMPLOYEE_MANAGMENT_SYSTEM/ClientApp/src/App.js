import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home  from './components/Home';
import { HrLogin } from './components/HrLogin';
import  {Index} from './components/Admin/index';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/admin_page' component={Index} />
        <Route path='/hr_login' component={HrLogin}/>
      </Layout>
    );
  }
}
