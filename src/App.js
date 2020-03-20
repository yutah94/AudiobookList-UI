import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import AudiobooksList from "./components/AudiobooksList";
import EditAudiobooks from "./components/EditAudiobooks";
import AddAudiobooks from "./components/AddAudiobooks";

import jazz from "./jazz.png"

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">

          <nav className="navbar navbar-expand-lg navbar-light bg-light container">
            <a className="navbar-brand" href="https://github.com/yutah94">
              <img src={jazz} width="30" height="30" alt="Yuta's Github" />
            </a>
            <Link to="/" className="navbar-brand"><h1>Yuta's Audiobook List App</h1></Link>
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Audiobook List</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add Audiobook</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/edit/:id" className="nav-link">Edit Audiobook</Link>
                </li>
              </ul>
          </nav>

          <Route path="/" exact component={AudiobooksList} />
          <Route path="/edit/:id" component={EditAudiobooks} />
          <Route path="/create" component={AddAudiobooks} />
        </div>
      </Router>
    );
  }
}

export default App;
