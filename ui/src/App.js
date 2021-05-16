import './styles/App.css'

import React, { Component } from 'react'

import LoadingTracker from './components/LoadingTracker'
import Questions from './components/Questions'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/* Score Box */}

          <LoadingTracker />
          <Questions />
          {/* Answer area */}
          {/* Possibility to submitt notes */}
        </div>
      </Router>
    )
  }
}

export default App
