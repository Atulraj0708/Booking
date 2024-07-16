import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function BookingRooms({place})
{
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [mob,setMob] = useState('');
  const [redirect,setRedirect]=useState('');
  const {user}=useContext(UserContext);

  useEffect(()=>{
    if(user)
    setName(user.name);
  },[user]);

  let NoOfDays=0;
  if(checkIn && checkOut)
  {
    NoOfDays=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));

  }
  async function FinalizeBooking()
  {
    const data={checkIn,checkOut,numberOfGuests,NoOfDays,name,mob,place:place._id,price:NoOfDays*place.price,};
    const response=await axios.post('/bookings',data);
    const bookingId=response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if(redirect)
  {
    return <Navigate to={redirect}/>
  }

    return(
        <div className="bg-white shadow p-4 rounded-2xl">
          <div className="text-2xl text-center">
        Price: ₹ {place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
      <div className="flex">
          <div className="py-3 px-4 border-l">
            <label>Check in:</label>
            <input type="date" className="cursor-pointer"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkOut} className="cursor-pointer"
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-l">
          <label>Number of guests:</label>
          <input type="number"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
        {NoOfDays>0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="mob"
                   value={mob}
                   onChange={ev => setMob(ev.target.value)}/>
          </div>
        )}
      </div>
      <button onClick={FinalizeBooking}  className="primary mt-4">
        Book this place
        {
            NoOfDays>0 && (
                <span> ${NoOfDays * place.price}</span>
            )
        }
      </button>
      </div>
    )
}