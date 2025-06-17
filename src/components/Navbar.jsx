import React, { useState } from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { SiInfracost } from 'react-icons/si';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

function Navbar() {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    return (
        <>
            <div className='container-fluid mx-auto shadow-lg py-3'>
                <div className='flex justify-between items-center px-5 container mx-auto py-3 '>
                    <div>
                        <h1 className='text-2xl font-semibold'>Audio <span className='text-green-400 font-extrabold'>Video Recording</span></h1>
                    </div>

                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-6 text-sm font-medium text-gray-700'>
                            <li className='flex items-center gap-2 cursor-pointer hover:text-blue-600'><IoHomeOutline /> Video Recorder</li>
                            <li className='flex items-center gap-2 cursor-pointer hover:text-blue-600'><SiInfracost /> Audio Recorder</li>
                            <li className='flex items-center gap-2 cursor-pointer hover:text-blue-600'><RiUserReceived2Fill /> Login</li>
                            <li className='flex items-center gap-2 cursor-pointer hover:text-blue-600'><RiUserReceived2Fill /> Register</li>
                            <li className='flex items-center gap-2 cursor-pointer hover:text-blue-600'><CiSearch /> Search</li>
                            <li onClick={toggle} className='flex items-center gap-2 cursor-pointer hover:text-blue-600'><AiOutlineMenu /> Menu</li>
                        </ul>
                    </div>

                    <div className='md:hidden'>
                        <button onClick={toggle} className='text-2xl text-gray-800'>
                            <AiOutlineMenu />
                        </button>
                    </div>
                </div>
            </div>

            {open && <div className="fixed inset-0 bg-black/70 z-40" onClick={toggle}></div>}
            <div className={`fixed top-0 right-0 h-full w-full bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex justify-between items-center px-4 py-4'>
                    <div>
                        <h1 className='font-semibold'>Audio <span className='text-green-400 font-extralight'>Video Recording</span></h1>
                    </div>          <button onClick={toggle} className='text-3xl'>
                        <AiOutlineClose />
                    </button>
                </div>
                <ul className='flex flex-col gap-6 px-6 py-10 text-xl font-semibold'>
                    <li className='flex items-center gap-3 cursor-pointer hover:text-gray-300'><IoHomeOutline /> About</li>
                    <li className='flex items-center gap-3 cursor-pointer hover:text-gray-300'><SiInfracost /> Services</li>
                    <li className='flex items-center gap-3 cursor-pointer hover:text-gray-300'><CiSearch /> Search</li>
                </ul>
            </div>
        </>
    );
}

export default Navbar;
