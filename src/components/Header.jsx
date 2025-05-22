import React, { useEffect, useState } from 'react'
import {FiMenu, FiHeart, FiSearch, FiShoppingChart, FiUser} from 'react-icons/fi';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState (false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState (false);

    useEffect(()=>{
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return ()  => window.removeEventListener('scroll', handleScroll);

    }, []);

    const navItems = [
        {id: 1, name: 'Home', link: '#Home'},
        {id: 2, name: 'Products', link: '#Products'},
        {id: 3, name: 'Service', link: '#Service'},
        {id: 4, name: 'About', link: '#About'},
        {id: 5, name: 'Contact', link: '#Contact'}
    ];

    return (
        <header className={'sticky top-0 z-50 transition-all duration-300'}>
            <div className={`w-full ${isScrolled ? 'bg-gray-100/95 backdrop-blur shadow-md py-2' : 'bg-gray-100 py-4'}`}>
                <div className='max-x-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6'>
                        <div className='flex justify-between items-center w-full md:w-auto'>
                            <a href="/" className='text-2xl font-bold text-gray-600'>
                            Juugo.Garage
                            </a>
                            <button
                                className='md:hidden text-gray-700 hover:text-shadow-black'
                                onClick={()=> setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label='Toggle mobile menu'>
                                    <FiMenu size={24}/>
                            </button>
                        </div>
                        <div className='w-full md:flex-1 max-w-sm'>
                            <div className='relative w-full'>
                                <input
                                 type = "text" 
                                 placeholder='Search...'
                                 className='w-full px-3 py-2 text-xs border border-gray-300 rounded-full
                                 focus:outline-none focus:ring-2 focus:ring-gray-700'/>
                            <button className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800'
                                aria-label='Search Button'>
                                    <FiSearch size={16}/> 
                            </button>
                            </div>
                        </div>
                        <div className='flex items-center justify-end space-x-4 w-full md:w-auto'>
                            <button className='relative p-2 text-gray-900 hover:text-shadow-white' aria-label='Wishlist'>
                                <FiHeart size={20}/>
                                <span className='absolute -top-1 -right-1 bg-white text-gray-600 text-xs *:rounded-full h-5 w-5 flex items-center justify-center'>
                                    3
                                </span>
                            </button>
                            <button className='relative p-2 text-gray-900 hover:text-shadow-white' aria-label='Cart'>
                                <FiShoppingChart size={20}/>
                                <span className='absolute -top-1 -right-1 bg-white text-gray-600 text-xs *:rounded-full h-5 w-5 flex items-center justify-center'>
                                    5
                                </span>
                            </button>
                            <button className='p-2 text-gray-500 hover:text-shadow-white' aria-label='User'>
                                <FiUser size={20}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-900'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <nav className='Hidden md:flex justify-center py-3'>
                        <ul className='flex flex-wrap gap-x-6 text-sm font-medium text-shadow-white'>
                            {navItems.map((item)=>(
                                <li key={item.id}>
                                    <a href={item.link} className='hover:text-gray-200 tran transition-colors'>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {isMobileMenuOpen && (
                        <div className='md:hidden mt-2 bg-white rounded-lg shadow-md p-4 space-y-3 text-gray-900 text-center'>
                            {
                                navItems.map((item)=>(
                                    <a key = {item.id} href={item.link} className='block hover:text-gray-500 text-sm font-medium'>
                                        {item.name}
                                    </a>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header