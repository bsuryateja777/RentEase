import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (user === null) {
      axios.get('/profile', { withCredentials: true})
        .then(({ data }) => setUser(data))
        .catch(err => {
          setUser(null)
        })
    }
  }, []);



  return (
    <UserContext.Provider value={{ user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
