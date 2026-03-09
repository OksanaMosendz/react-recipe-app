import { useLocation, useNavigate } from "react-router-dom";

function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

console.log(location.state?.back)

  return (
    <button onClick={() => navigate(location.state?.back || "/")}>
   {location.state?.back ? 'Back' : 'Go to HomePage'}
    </button>
  );
}

export default BackButton;
