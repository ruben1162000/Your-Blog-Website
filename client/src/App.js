// import logo from './logo.svg';
// import './App.css';
import React, { useEffect, useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import PostedBlogs from './components/PostedBlogs';
import PendingBlogs from './components/PendingBlogs';
import ViewBlog from './components/ViewBlog';
import BlogEditor from './components/BlogEditor';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from "axios";
import UserContext from "./contexts/UserContext";
function App() {
  const [userData, setUserData] = useState({ token: "", username: "" });
  useEffect(() => {
    const loginCheck = async () => {
      let token = localStorage.getItem("auth-token");
      let username = localStorage.getItem("username");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        localStorage.setItem("username", "");
        token = "";
        username = "";
        setUserData({ token, username });
        return;
      } else if (token === "") return;
      try {
        const tokenRes = await axios.post("/api/user", null, {
          headers: { "x-auth-token": token }
        });
        const { status, data } = tokenRes;
        if (data.valid) {
          setUserData({ token, username });
        } else {
          localStorage.setItem("auth-token", "");
          localStorage.setItem("username", "");
          token = "";
          username = "";
          setUserData({ token, username });
        }
      } catch (error) {
        const { status, data } = error.response;
        //500 page
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
              <Route path="/viewBlog/:blogid">
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
                <BlogEditor />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/Error500">
                <ErrorPage status={500} />
              </Route>
              <Route path="*">
                <ErrorPage status={404} />
              </Route>
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
