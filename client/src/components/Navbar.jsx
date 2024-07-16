import React, { useContext } from 'react'
import Logo from "../assets/logo.png";
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';


function Navbar ()  {
  const {user}=useContext(UserContext);
  return (

          <header className="p-4 flex justify-between">
        <Link to={"/"} href="" className="flex items-center gap-1">
          <img className="h-12 w-12" src={Logo} alt="Logo" />
          <span className="font-bold text-xl">AR Booking</span>
        </Link>

        <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
        </div>

        <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 relative top-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        {
          !!user && (
            <div>
              {user.name}
            </div>
          )
        }
        </Link>
      </header>
  )
}

export default Navbar