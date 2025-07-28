
import { useState, useContext } from "react";
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../userContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { setUser } = useContext(UserContext);


    async function registerUser(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            await axios.post('/register', { name, email, age, gender, password });

            toast.success("Registration successful");

            const loginResponse = await axios.post('/login', {
                email,
                password,
            }, {
                withCredentials: true,
            });

            setUser(loginResponse.data)

            setRedirect(true)

        } catch (e) {
            const errorMessage = e.response?.data?.error || "Registration failed";
            toast.error(errorMessage);
            console.error("Registration/Login error:", e);
        }
    }


    if (redirect) {
        return <Navigate to={'/home'} />;

    }

    return (
        <div className="mt-6 grow flex items-center justify-center">


            <div className="mb-60">


                <h1 className="text-4xl text-center m-4">Register</h1>

                <form className="max-w-md mx-auto mt-3 p" onSubmit={registerUser}>

                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required></input>

                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com " required></input>

                    <div className="flex gap-2">
                        <input className="age" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required></input>

                        <select className="gender border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={gender} onChange={e => setGender(e.target.value)} required >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                    </div>

                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password " required></input>

                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password " required></input>

                    <button className="primary" type="submit">Register</button>


                    <div className="text-center py-2 text-gray-500">
                        Already a member?
                        <Link to={'/login'} className="underline text-black p-2">Login</Link>
                    </div>


                </form>

            </div>

        </div>
    )
}