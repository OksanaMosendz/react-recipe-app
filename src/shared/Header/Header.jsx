import { NavLink, Link } from "react-router-dom";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

function Header({ title }) {
  
  return (
    <header className={styles.header}>
      <Container className={styles.header_container}>
        <nav>
        <ul className={styles.nav_list}>
        <li>  <NavLink className={({isActive})=>isActive ? styles.active : styles.nav_link} to="/">Home</NavLink></li>
        <li>  <NavLink className={({isActive})=>isActive ? styles.active : styles.nav_link} to="/favorites">Favorites</NavLink></li>
        <li>  <NavLink className={({isActive})=>isActive ? styles.active : styles.nav_link} to="/about">About</NavLink></li>
        </ul>
        </nav>

        <div className={styles.header_content}>
        <Link to='/'>
          <Logo className="logo-header" />
          </Link>
          <h1>{title}</h1>
        </div>
      </Container>
    </header>
  );
}

export default Header;
