import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'


export default class App extends Component {
  render() {
    return (
        <Switch>
            <Route exact path='/' Component={Home}/>
        </Switch>
    )
  }
}
