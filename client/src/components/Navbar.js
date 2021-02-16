import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [arrowDown, setArrow] = useState(true);
    const rot180 = (e) => {
        setArrow(!arrowDown);
    }
    const { userData, setUserData } = useContext("UserContext");
    return (
        <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">Your BlogSpot</a>
            <button onClick={rot180} className='navbar-toggler' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className={(arrowDown) ? "fas fa-angle-down" : "fas fa-angle-down rot180"}></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav navbar-right ml-auto">
                    <li className="nav-item mx-2">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    {
                        userData.token ?
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/" onClick>Log out</Link>
                            </li> :
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/Login">Log in</Link>
                            </li>
                    }
                    {
                        userData.token &&
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="/postedBlogs">Posted Blogs</Link>
                        </li>
                    }
                    {
                        userData.token &&
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="/pendingBlogs">Pending Blogs</Link>
                        </li>

                    }
                    {
                        userData.token &&
                        <li className="nav-item mx-2">
                            <Link className="nav-link" to="/create">New Blog</Link>
                        </li>
                    }

                </ul>
            </div>
        </nav>
        // <nav className="navbar">
        //     <h1>The Dojo Blog</h1>
        //     <div className="links">
        //         <a href="/">Home</a>
        //         <a href="/create">New Blog</a>
        //     </div>
        // </nav>
    );
}

export default Navbar;