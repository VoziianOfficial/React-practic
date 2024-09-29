import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchUserById } from "../../services/api";
import { Suspense } from "react";

const UserDetails = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const goBackRef = useRef(location.state);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUserById(userId);
      setUser(data);
    };
    getData();
  }, [userId]);

  if (!user) return <h2>Loading...</h2>;
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <Link to={goBackRef.current ?? "/users"}>Home</Link>
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      <h2>
        {user.lastName} {user.firstName}
      </h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <hr />
      <div>
        <NavLink to="info">Info</NavLink>
        <NavLink to="posts">Posts</NavLink>
      </div>
      <Suspense fallback={<h2>Second suspense</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default UserDetails;
