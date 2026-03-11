import Button from '../../shared/Button/Button';
import styles from './NotFound.module.css';
import notFound from '../../assets/img/notFound.svg';
import {useNavigate, useLocation} from "react-router-dom";
 
  function NotFound(){
      const location = useLocation();
  const navigate = useNavigate();
   return (<section className={styles.notFound_section}>
   <img src={notFound} alt="page not found"/>
   <h2>Ooops! Page not found!</h2>
   <p>The page you’re looking for doesn’t exist.</p>

   <Button
        handleEvent={() => navigate(location.state?.back || "/")}
        text={location.state?.back ? "Back" : "Go to Home Page"}
      />
  
  </section>)
}

export default NotFound;