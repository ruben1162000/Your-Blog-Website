import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
const Navbar = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [arrowDown, setArrow] = useState(true);
    const rot180 = (e) => {
        setArrow(!arrowDown);
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Your BlogSpot</Link>
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
                            <li className="nav-item mx-2 dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userData.username}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/postedBlogs">Posted Blogs</Link>
                                    <Link className="dropdown-item" to="/pendingBlogs">Pending Blogs</Link>
                                    <Link className="dropdown-item" to="/create">New Blog</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/logout">Logout</Link>
                                </div>
                            </li> :
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/Login">Log in</Link>
                            </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;