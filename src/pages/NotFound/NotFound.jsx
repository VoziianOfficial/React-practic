import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Sorry this page is not found...</h1>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default NotFound;
