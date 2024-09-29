import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../../services/api";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import FilterBar from "../FilterBar/FilterBar";

const UsersApp = () => {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  console.log(location);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    getAllUsers();
  }, []);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      return setSearchParams({});
    }
    searchParams.set("query", newQuery);
    setSearchParams(searchParams);
  };

  const filterData = useMemo(() =>
    users.filter(
      (user) =>
        user.lastName.toLowerCase().includes(query.toLowerCase()) ||
        user.firstName.toLowerCase().includes(query.toLowerCase())
    )
  );
  return (
    <div>
      <h2>Users</h2>
      <FilterBar handleChangeQuery={handleChangeQuery} />
      <ul>
        {filterData.map((user) => (
          <li key={user.id}>
            <Link to={user.id.toString()} state={location}>
              <p>
                {user.lastName} {user.firstName}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsersApp;
