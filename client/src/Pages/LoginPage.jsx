import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../userContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const {state} = useLocation()
  const {place} = state || ''


  
  async function userLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email, password }, { withCredentials: true });
      setUser(response.data);
      toast.dark("Login successful");
      if(place){
        navigate(`/home/${place._id}`)
        return
      }
      setRedirect(true)
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "Login failed";

        if (status === 404) {
          toast.error("User not found. Please register.");
        } else if (status === 422) {
          toast.error("Incorrect password.");
        } else {
          toast.error(message);
        }
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  }


  if (redirect) {
    return <Navigate to={'/home'} />;
  }

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center m-4">Login</h1>
        <form className="max-w-md mx-auto mt-3" onSubmit={userLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
          <button className="primary " type="submit">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?
            <Link to={'/register'} className="underline text-black p-2">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
