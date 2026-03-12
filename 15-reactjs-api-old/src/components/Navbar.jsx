import "./Navbar.css";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {children}
      </div>
    </nav>
  );
}

export default Navbar;