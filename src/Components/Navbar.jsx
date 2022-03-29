import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Account from './Account';
import logo from '../images/logo.svg';
import avatar from '../images/avatar-4.png';

function Navbar({ session }) {
  const [LanguageWin, setLanguageWin] = useState(false);
  const [NameAcc, setNameAcc] = useState("");
  const [IsAccountPage, setIsAccountPage] = useState(false);

  async function getUserInfo() {
    const request = await fetch(`http://localhost:3001/profile?id=${session}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    var response = await request.json();
    setNameAcc(response[0].FullName);
  }

  useEffect(() => {
    if (session !== null) {
      getUserInfo();
    }
  }, [])

  window.addEventListener('click', (e) => {
    if (e.target.id !== 'open-list') {
      setLanguageWin(false);
    }
  })

  return (
    <div>
      <nav className='shadow-mine'>
        <div className="container py-3 flex justify-between items-center">
          <div className="left-side flex items-center justify-between w-full md:w-auto">
            <div className="sm:w-32 w-28 mr-2 md:mr-0">
              <Link to='/'>
                <img src={logo} />
              </Link>
            </div>
            <div className="flex items-center rounded-md bg-primary-bg overflow-hidden md:mx-8">
              <form action="search">
                <input name="keyword" type="text" placeholder='Search' className='bg-primary-bg px-2 md:px-4 py-2 text-sm md:text-base outline-none' />
              </form>
              <div className='px-2 hidden sm:block'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-primary p-1.5 rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path className='text-white' strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="right-side md:static md:w-auto md:pb-0 fixed bottom-0 pb-2 w-full left-0 md:border-none border-t border-txt-gray bg-white z-40">
            <div className='flex md:justify-start justify-center text-txt-black pt-1.5 md:pt-0'>
              {session !== null ?
                <div>
                  <div className='flex items-center h-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-txt-gray mx-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-txt-gray mx-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-txt-gray mx-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                :
                <div>
                  <div className="links flex mx-2">
                    <div className='flex m-1.5 cursor-pointer' onClick={() => {setIsAccountPage(true)}}>
                      <span className='mx-2 hover:text-black'>Account</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-[1px] text-txt-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              }
              <div className="w-[1px] bg-txt-gray"></div>
              {session !== null &&
                <div className='flex items-center mx-3'>
                  <img src={avatar} alt="pic" className='rounded-full' />
                  <span className='text-sm font-bold px-1.5'>{NameAcc}</span>
                </div>
              }
              <div className='flex items-center ml-3.5 relative'>
                <span id='open-list' className='px-4 py-1 border border-[rgb(234,234,234)] rounded-2xl cursor-pointer' onClick={() => { if (LanguageWin === false) { setLanguageWin(true) } else { setLanguageWin(false) } }}>US</span>
                {LanguageWin &&
                  <div className='absolute shadow-mine md:top-[120%] left-[-20%] flex flex-wrap bg-white/40 py-2 rounded-xl backdrop-blur-sm'>
                    <div className='flex-1 hover:bg-white px-4 py-1 cursor-pointer duration-200'>
                      <span className='font-semibold'>English</span>
                      <p className='text-xs'>United States</p>
                    </div>
                    <div className='flex-1 hover:bg-white px-4 py-1 cursor-pointer duration-200'>
                      <span className='font-semibold'>Francais</span>
                      <p className='text-xs'>Canada</p>
                    </div>
                    <div className='flex-1 hover:bg-white px-4 py-1 cursor-pointer duration-200'>
                      <span className='font-semibold'>Türkçe</span>
                      <p className='text-xs'>Turkish</p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </nav >
      <Account open={IsAccountPage} close={setIsAccountPage}/>
    </div>
  )
}

export default Navbar
