// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import Signup from './components/Signup';
import Signup from './components/Login';
import Signup from './components/PostedBlogs';
import Signup from './components/PendingBlogs';
import UserContext from "./contexts/UserContext";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from "axios";
import Login from "./components/Login";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const loginCheck = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("/api/users", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.status == 500) {
        //some 500 page
      }
      else if (tokenRes.valid) {
        setUserData({
          token,
          user: userRes.userData,
        });
      }
    }
    loginCheck();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="App">
          <Navbar />
          <div className="content mt-5">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/viewBlog/:blogid">
                <ViewBlog />
              </Route>
              <Route path="/postedBlogs">
                <PostedBlogs />
              </Route>
              <Route path="/pendingBlogs">
                <PendingBlogs />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/blogEditor/:blogid">
                <Create />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
