import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    if (!ready && user === null) {
      axios.get('https://rentease-backend-5p7h.onrender.com/profile', { withCredentials: true})
        .then(({ data }) => setUser(data))
        .catch(err => {
          if (err.response?.status === 401) {
            setUser(null);
          } else {
            console.error("Profile fetch error:", err.message);
          }
        })
        .finally(() => setReady(true));
    }
  }, [ready, user]);



  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
