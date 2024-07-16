import { Navigate, useParams } from "react-router-dom";
import {  useEffect, useState } from "react";
import axios from "axios";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";


export default function PlacesForm()
{
    const { id } = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [photos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
     const [redirect,setRedirect] = useState(false);

     useEffect(()=>{
      if(!id)
      return;
      axios.get('/places/'+id).then(
        response=>{
          const{data}=response;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price);
        }
      )
     },[id])

     async function savePlaces(e)
     {
      if(id)
      {
        e.preventDefault();
       const placeData={id,title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price,}
       await axios.put('/places',placeData);
       setRedirect(true);
      }
      else{
        e.preventDefault();
       const placeData={title,address,photos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price,}
       await axios.post('/places',placeData);
       setRedirect(true);
      }
       
     }
     if(redirect)
     {
       return <Navigate to={'/account/places'}/>
     }

     return(
        <>
        <AccountNav/>
         <form onSubmit={savePlaces}>
              <h2 className="text-2xl mt-5">Title</h2>
              <p className="text-gray-500 text-sm">Title for your place</p>
              <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="title" />
              <h2 className="text-2xl mt-5">Address</h2>
              <p className="text-gray-500 text-sm">Address to this place</p>
              <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="address" />
              <h2 className="text-2xl mt-5">Photos</h2>
              <p className="text-gray-500 text-sm">More is better</p>
              <PhotosUploader photos={photos} onChange={setAddedPhotos}/>
              <h2 className="text-2xl mt-5">Description</h2>
              <p className="text-gray-500 text-sm">Description of the place</p>
              <textarea  value={description} onChange={(e)=>setDescription(e.target.value)}/>
              <h2 className="text-2xl mt-5">Perks</h2>
              <p className="text-gray-500 text-sm">Select all perks of your place</p>
              <div className="grid mt-2 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
               <Perks selected={perks} onChange={setPerks}/>
              </div>

              <h2 className="text-2xl mt-4">Extra Information</h2>
              <p className="text-gray-500 text-sm">Rules for the place</p>
              <textarea value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)}/>  
              <h2 className="text-2xl mt-4">Check In & CheckOut</h2>
              <p className="text-gray-500 text-sm">Add check in and check out times,remember to have some window for cleaning the room between the guests</p>
              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <h3 className="mt-2 -mb-1">Check In Time</h3>
                  <input type="text" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} placeholder="09:00" />
                </div>
                <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                  <input type="text"  value={checkOut} onChange={(e)=>setCheckOut(e.target.value)}  placeholder="12:00"/>
                </div>
                <div>
                <h3 className="mt-2 -mb-1">Max No. of Guests</h3>
                  <input type="number"  value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)}  placeholder="15"/>
                </div>
                <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
                </div>
              </div>
                <button className="primary my-4">Save</button>
            </form>
        </>
     )
}