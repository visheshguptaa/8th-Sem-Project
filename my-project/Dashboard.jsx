import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ComplaintCard from '../components/ComplaintCard';
import axios from 'axios'
import Cookies from 'js-cookie'

import { Link } from 'react-router';

import { TiMessageTyping } from "react-icons/ti";

const Dashboard = () => { 
   const[count,setCount] = useState();
   const[msg,setMsg] = useState();
  
   
    let navigate = useNavigate();
    let email = localStorage.getItem('email');
    let name = localStorage.getItem('userName')
    let id = localStorage.getItem('userId');

    let tokken = Cookies.get("token");

    function handleClick(){

        navigate("/addcomplaint");
    }


  const [userData,setUserData] = useState([]);
useEffect(()=>{
  axios.get(`http://localhost:5000/test/getAllComplaints/${id}`,
    {
      headers: {
        'Authorization':  tokken
      }
    }  

  )
  .then((res)=>{
    console.log(res.data);
    console.log(res.data.chats.length);
    setCount(res.data.chats.length);
    setUserData(res.data.result);
    
      setMsg(res.data.result.length);

    
    
  })  
},[])

    
  return (
    <div className='flex  justify-center font-[sans-serif] sm:h-screen max-sm:flex-col '> 
        <div className='bg-gray-600 w-1/4  h-full  p-3   max-sm:w-[3rem] max-sm:h-[3.5rem]  ' >
        
            <div class="shrink-0 group block">
                <div class=" items-center w-auto h-auto flex  flex-col ">
                    <img class="inline-block shrink-0 size-[62px] rounded-full max-sm:size-[40px]" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Avatar" />
                    <div class="ms-3 max-sm:hidden">
                      <h3 class="font-semibold h-10 text-gray-800">{name}</h3>
                      <p class="text-sm font-medium text-gray-400">{email}</p>
                      
                    </div>
                    { msg > 0 &&
                    <div className='w-[100px] h-[100px]  flex flex-col text-white justify-center text-center '>
                      <div className='flex justify-center'>
                      <Link to={'/userChat' } state={{userId : id}}  className="    text-5xl">
                            <TiMessageTyping/>
                      </Link>

                      </div>
                      <h1>message admin</h1>
                    </div>
                    }
                      {count > 0 && <p className='text-red-600'>you have messages</p>}
                </div>
            </div>

           
        </div>

        <div className='w-screen overflow-scroll   '>
            <h1 className='text-5xl'>Your Commplaints</h1>

            {userData.map((complaint, index) => (
            
            <ComplaintCard id={complaint._id} title={complaint.title} desc={complaint.description} img={complaint.img} status={complaint.status} />  
        ))}

          

            <button className='fixed bottom-10 right-10 bg-teal-600 h-[40px] w-[150px] rounded-xl ' onClick={handleClick} > Add complaint + </button>
        </div>

       

    </div>
  )
}

export default Dashboard