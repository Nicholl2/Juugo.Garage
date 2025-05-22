import React, { useEffect, useState } from 'react'
import {FiMenu} from 'react-icons/fi';

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
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header