import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Store from './redux/store';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Forms from './components/forms'
import UpdateDetails from './components/updateDetails';
import Users from './components/users';
import UserPoll from './components/userPoll';
import Forms1 from './components/forms1';




function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route excat path='/' element={<Home />} />
            <Route excat path='/form' element={<Forms />} />
            <Route excat path='/forms1/:id' element={<Forms1 />} />
            <Route excat path='/user' element={<Users />} />
            <Route excat path='/userPoll' element={<UserPoll />} />
            <Route excat path='/edit/:id' element={<UpdateDetails />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;