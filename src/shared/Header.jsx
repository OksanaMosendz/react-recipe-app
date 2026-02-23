import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/favorite">Favorite</NavLink>
            <NavLink to="/about">About</NavLink>
         </nav>
      </div>
    </>
  );
}

export default Header;
