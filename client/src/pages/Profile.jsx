import { UserContext } from "../components/UserContext"
import { useContext } from "react"
import { Navigate, useLocation, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Places from "./Places";
import AccountNav from "../components/AccountNav";

export default function Profile(){

    let {subpage}=useParams();
    const[redirect,setRedirect]=useState(null);
    const {ready,user,setUser}=useContext(UserContext);

    if(subpage===undefined)
    {
        subpage='profile';
    }
    
    async function logout()
    {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }
    if(!ready)
    return 'Loading...';

    if(ready && !user && !redirect)
    <Navigate to={"/login"}/>

    
   
    console.log({subpage})

    
    if(redirect)
    {
        return <Navigate to={redirect}/>
    }
    return(
        <div>
           <AccountNav/>
            {subpage==='profile' &&(
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button className="primary max-w-sm mt-2" onClick={logout}>
                        Logout
                    </button>
                </div>
            )}
            {subpage==='places' &&(
                <div className="text-center max-w-lg mx-auto">
                   <Places/>
                </div>
            )}

        </div>
    )
}