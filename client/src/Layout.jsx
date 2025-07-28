import { Outlet } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';

export default function Layout(){
    return(
        <div className='p-4 flex flex-col  min-h-screen max-w-screen'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}