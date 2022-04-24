import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import addBook from './pages/addBook';
import bookrequest from './pages/bookrequest';
import extensionRequest from './pages/extensionRequest';
import home from './pages/home';
import messageRequest from './pages/messageRequest';
import noMatch from './pages/noMatch';
import userPage from './pages/userPage';
import viewAllBooks from './pages/viewAllBooks';
import viewBook from './pages/viewBook';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/addBook' component={home} />
          <Route path='/bookrequest' component={bookrequest} />
          <Route path='/extensionRequest' component={extensionRequest} />
          <Route path='/messageRequest' component={messageRequest} />
          <Route path='/noMatch' component={noMatch} />
          <Route path='/userPage' component={userPage} />
          <Route path='/viewAllBooks' component={viewAllBooks} />
          <Route path='/viewBook' component={viewBook} />         
          <Route exact path='/' component={addBook} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
