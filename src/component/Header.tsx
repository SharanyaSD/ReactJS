import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <h1 className="navbar-brand">To-Do</h1>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/" className="nav-link active" aria-current="page">
              Home
            </Link>
            <Link to="/addtodo" className="nav-link active" aria-current="page">
              Add Todo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
