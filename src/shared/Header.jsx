import { NavLink } from "react-router-dom";

function Header({title}) {
  return (
    <>
      <div>

        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
            <NavLink to="/about">About</NavLink>
         </nav>

          <h1>{title}</h1>
      </div>
    </>
  );
}

export default Header;
