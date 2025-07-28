import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    if (!user) {
      axios.get('https://rentease-backend-5p7h.onrender.com/profile', {
        withCredentials: true,
      })
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((err) => {
          console.error("Profile fetch error:", err.message);
          setReady(true);
        });
    }
  }, [user]);



  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
