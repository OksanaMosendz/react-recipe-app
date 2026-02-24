import { Link } from "react-router-dom";

function NotFound(){

   return (<>   
   <h2>Ooops! Page not found</h2>
   <p>The page you’re looking for doesn’t exist.</p>
   <Link to="/">Back to Home</Link></>)
}

export default NotFound;