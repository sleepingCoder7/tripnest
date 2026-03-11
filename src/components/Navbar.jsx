import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo/tripnest-logo.png'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const wishlistCount = useSelector((state) => state.wishlist.items.length)
    
  return (
    <header className='flex justify-between items-center px-8 py-2 bg-white shadow-md sticky top-0 z-50'>
        <Link to="/" className='flex items-center gap-3'>
            <img src={logo} alt="TripNest" className='h-15 w-auto'/>
        </Link>
        <nav className='flex gap-6 items-center text-primary font-medium'>
            <Link to="/" className='hover:text-secondary transition-colors duration-300'>Home</Link>
            <Link to="/hotels" className='hover:text-secondary transition-colors duration-300'>Hotels</Link>
            <Link to="/about" className='hover:text-secondary transition-colors duration-300'>About</Link>
            <Link to="/wishlist" className='hover:text-secondary transition-colors duration-300 relative'>
                Wishlist
                {wishlistCount > 0 && (
                    <span className='absolute -top-2 -right-4 bg-accent text-white text-xs px-2 py-0.5 rounded-full'>
                        {wishlistCount}
                    </span>
                )}
            </Link>
        </nav>
    </header>
  )
}

export default Navbar