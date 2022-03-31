import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Account from './Account';
import logo from '../images/logo.svg';
import avatar from '../images/avatar-4.png';

function Navbar() {
  const session = sessionStorage.getItem('user');

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

  const logout = () => {
    sessionStorage.removeItem('user');
    window.location = "/";
  }

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
                    <svg className="h-5 w-5 text-txt-gray mx-3 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                      onClick={() => logout()} >
                      <path d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z" fill="currentColor" />
                      <path d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z" fill="currentColor" />
                    </svg>
                    <div className="w-[1px] h-full bg-txt-gray"></div>
                    <div>
                      <div className='flex items-center mx-3'>
                        <div className="w-[1px] bg-txt-gray"></div>
                        <img src={avatar} alt="pic" className='rounded-full' />
                        <span className='text-sm font-bold px-1.5'>{NameAcc}</span>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div>
                  <div className="links flex mx-2">
                    <div className='flex m-1.5 cursor-pointer' onClick={() => { setIsAccountPage(true) }}>
                      <span className='mx-2 hover:text-black'>Account</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-[1px] text-txt-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </nav >
      <Account open={IsAccountPage} close={setIsAccountPage} />
    </div>
  )
}

export default Navbar