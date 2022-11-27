import axios from "axios";
import { useEffect, useState } from "react";
const Card = () => {
  const { users } = useUsers();
  console.log(users);
  console.log("render");
  return (
    <div>
      <h1>Custom hooks</h1>
      {users.map((user) => {
        return (
          <div key={user.userID}>
            <h3>this is {user.userID}</h3>
            <div>{user.data.phone}</div>
          </div>
        );
      })}
      <h1>Custom hooks</h1>
    </div>
  );
};
const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:8000/users`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, []);
  return { users };
};
export default Card;
