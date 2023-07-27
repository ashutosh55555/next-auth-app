
"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Header() {
  const router = useRouter()
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/login')
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
    }
}
  return (
    <nav className="bg-blue-900">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
       
        <div className="flex-shrink-0">
          <a href="" className="text-white font-semibold text-lg">Logo</a>
        </div>
 
        <div className="md:hidden flex items-center">
          <button id="mobile-menu-toggle" className="text-white hover:text-gray-200 focus:outline-none">
            <i className="fas fa-bars"></i>
          </button>
        </div>
   
        <div id="menu-items" className="hidden md:flex justify-center flex-grow">
          <Link href="/profile" className="text-gray-300 hover:text-white px-4">
            <i className="fas fa-home mr-1"></i>
            Home
          </Link>
          <Link href="/profile/about" className="text-gray-300 hover:text-white px-4">
            <i className="fas fa-info-circle mr-1"></i>
            About
          </Link>
          <Link href="/profile/addcard" className="text-gray-300 hover:text-white px-4">
            <i className="fas fa-cogs mr-1"></i>
            AddPaymentCard
          </Link>
          <Link href="/profile/listingcard" className="text-gray-300 hover:text-white px-4">
            <i className="fas fa-envelope mr-1"></i>
            ListingPaymentCard
          </Link>
          <Link href="/profile/editor" className="text-gray-300 hover:text-white px-4">
            <i className="fas fa-envelope mr-1"></i>
            Editor
          </Link>
          <Link href="/profile/chatgpt" className="text-gray-300 hover:text-white px-4">
            <i className="fas fa-envelope mr-1"></i>
            Chatgpt
          </Link>
        </div>
    
        <div className="md:flex-shrink-0 hidden md:block">
          <button  onClick={logout}className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            <i className="fas fa-sign-in-alt mr-1"></i>
            Log Out
          </button>
        </div>
      </div>
     
      <div id="responsive-menu" className="md:hidden hidden bg-blue-900">
        <a href="#" className="block py-2 px-4 text-gray-300 hover:text-white">
          <i className="fas fa-home mr-1"></i>
          Home
        </a>
        <a href="#" className="block py-2 px-4 text-gray-300 hover:text-white">
          <i className="fas fa-info-circle mr-1"></i>
          About
        </a>
        <a href="#" className="block py-2 px-4 text-gray-300 hover:text-white">
          <i className="fas fa-cogs mr-1"></i>
          Services
        </a>
        <a href="#" className="block py-2 px-4 text-gray-300 hover:text-white">
          <i className="fas fa-envelope mr-1"></i>
          Contact
        </a>
      </div>
    </div>
  </nav>
  
  
  )
}
