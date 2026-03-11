import Container from "../Container/Container";
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';
import {Link} from "react-router-dom";

 function Footer() {
   return(
   <footer className={styles.footer}>
   <Container className={styles.footer_container}>
   <p>&copy; {new Date().getFullYear()} Oksana Mosendz</p>
  <Link to="/">
   <Logo className="logo-footer"/>
</Link>
   
   </Container>
   </footer>)
}

export default Footer;