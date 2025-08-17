import './NavBar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/">Articles</a>
      </li>
      <li>
        <a href="/topics">Topics</a>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;