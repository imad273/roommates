import React from 'react'
import { useEffect, useState } from "react";

function Account({ open, close }) {

  const [LoginPage, setLoginPage] = useState(false);

  const [elm, setElm] = useState(false)

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const showErr = (error) => {
    let msg = document.getElementById('error');
    msg.classList.remove('hidden');
    msg.childNodes[0].childNodes[1].innerHTML = error;
  }

  async function SingUp() {
    let btn = document.getElementById('sub-btn');
    btn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 animate-spin m-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'/></svg>";
    if (Name === '' || Email === '' || Password === '') {
      showErr("Please Complete The Form");
      btn.innerHTML = "Sign Up"
    } else {
      const request = await fetch('http://localhost:3001/regester', {
        method: 'POST',
        body: JSON.stringify({
          FullName: Name,
          Email: Email,
          Password: Password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await request.json();

      if (response.isRegister === true) {
        window.sessionStorage.setItem("user", response.user_id)
        window.location = '/';
        btn.innerHTML = `Sign Up`
      } else {
        showErr("Semthing wrong");
        btn.innerHTML = "Sign Up"
      }
    }
  }

  async function Login() {
    let btn = document.getElementById('sub-btn');
    btn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 animate-spin m-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'/></svg>";
    if (Email === '' || Password === '') {
      showErr("Please Complete The Form");
      btn.innerHTML = "Login"
    } else {
      const request = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify({
          Email: Email,
          Password: Password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await request.json();

      if (response.isEmailExist === false) {
        showErr("Email is not Exists");
        btn.innerHTML = "Login"
      } else if (response.isPasswordExist === false) {
        showErr("Password is wrong");
        btn.innerHTML = "Login"
      } else if (response.isEmailExist === true && response.isPasswordExist === true) {
        window.sessionStorage.setItem("user", response.user_id)
        window.location = '/';
        btn.innerHTML = "Login"
      } else {
        showErr("Semthing wrong");
        btn.innerHTML = "Login"
      }
    }
  }

  useEffect(() => {
    setElm(true);
  })

  return (
    <section>
      {open &&
        <div className='fixed h-screen top-0 left-0 w-full text-txt-black bg-black/40 flex justify-center items-center backdrop-blur-sm z-40'>
          {LoginPage ?
            <div className={`flex flex-wrap p-4 bg-white rounded-xl m-2 duration-700 ${elm ? 'opacity-100' : 'opacity-5'} `}>
              <div className="w-full mb-1.5">
                <div className="cursor-pointer" onClick={() => { close(false) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="bg-primary-bg p-3 w-full text-center rounded-lg">
                <h3 className="font-bold text-2xl">Welcom back</h3>
              </div>

              <div className="flex flex-col p-6 w-full">
                <p className="text-sm text-center text-txt-gray">
                  Create new account?
                  <span className="font-semibold text-primary cursor-pointer" onClick={() => { setLoginPage(false) }}> Sing Up</span>
                </p>

                <div id="error" className="hidden text-red-600 m-auto mt-4">
                  <div className="flex justify-center text-red-600">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-center font-medium ml-1"></p>
                  </div>
                </div>

                <form className="flex flex-col mt-4" onSubmit={(e) => { e.preventDefault() }}>
                  <label htmlFor="email" className="text-txt-gray">Email</label>
                  <input type="text" id="email" className="border-b  outline-none mb-1 focus:border-primary" value={Email} onChange={(e) => { setEmail(e.target.value) }} autoComplete="OFF" />
                  <label htmlFor="pass" className="text-txt-gray">Password</label>
                  <input type="password" id="pass" className="border-b outline-none mb-1 focus:border-primary" value={Password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="OFF" />
                  <button id='sub-btn' onClick={() => { Login() }} className="bg-primary text-white m-auto mt-1.5 w-2/5 rounded-md p-2">Login</button>
                </form>
              </div>
            </div>
            :
            <div className={`flex flex-wrap p-4 bg-white rounded-xl m-2 duration-700 ${elm ? 'opacity-100' : 'opacity-5'} `}>
              <div className="w-full mb-1.5">
                <div className="cursor-pointer" onClick={() => { close(false) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <div className="bg-primary-bg p-3 w-full text-center rounded-lg">
                <h3 className="font-bold text-2xl">Welcom to Roommates</h3>
                <p className="max-w-[500px] m-auto text-sm text-txt-gray">Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Rommates.</p>
              </div>
              <div className="flex flex-col p-6 w-full">
                <div className="mb-6">
                  <h3 className="text-center font-medium text-4xl mb-1">Get Started</h3>
                  <p className="text-sm text-center text-txt-gray">
                    Already have an account?
                    <span className="font-semibold text-primary cursor-pointer" onClick={() => { setLoginPage(true) }}> Sing In</span>
                  </p>
                </div>
                <div id="error" className="hidden text-red-600">
                  <div className="flex justify-center text-red-600">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-center font-medium ml-1"></p>
                  </div>
                </div>

                <form className="flex flex-col mt-2" onSubmit={(e) => { e.preventDefault() }}>
                  <label htmlFor="name" className="text-txt-gray">Name</label>
                  <input type="text" id="name" className="border-b outline-none mb-1 focus:border-primary" value={Name} onChange={(e) => { setName(e.target.value) }} autoComplete="OFF" />
                  <label htmlFor="email" className="text-txt-gray">Email</label>
                  <input type="text" id="email" className="border-b  outline-none mb-1 focus:border-primary" value={Email} onChange={(e) => { setEmail(e.target.value) }} autoComplete="OFF" />
                  <label htmlFor="pass" className="text-txt-gray">Password</label>
                  <input type="password" id="pass" className="border-b outline-none mb-1 focus:border-primary" value={Password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="OFF" />
                  <button id='sub-btn' onClick={() => { SingUp() }} className="bg-primary text-white m-auto mt-1.5 w-2/5 rounded-md p-2">Sing Up</button>
                </form>
              </div>
            </div>
          }
        </div >
      }
    </section>
  )
}

export default Account