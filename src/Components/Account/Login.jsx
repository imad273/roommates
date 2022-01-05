import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
   const [elm, setElm] = useState(false)
   const [Email, setEmail] = useState("")
   const [Password, setPassword] = useState("")

   const showErr = (error) => {
      let msg = document.getElementById('error');
      msg.classList.remove('hidden');
      msg.childNodes[0].childNodes[1].innerHTML = error;
   }

   async function sendData() {
      let btn = document.getElementById('sub-btn');
      btn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 animate-spin m-auto' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'/></svg>";
      if (Email === '' || Password === '') {
         showErr("Please Complete The Form");
         btn.innerHTML = "Sign Up"
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
      <div className='fixed h-screen top-0 left-0 w-full text-txt-black bg-black/40 flex justify-center items-center backdrop-blur-sm z-40'>
         <div className={`flex flex-wrap p-4 bg-white rounded-xl m-2 duration-700 ${elm ? 'opacity-100' : 'opacity-5'} `}>
            <div className="w-full mb-1.5">
               <Link to='/'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </Link>
            </div>
            <div className="bg-primary-bg p-3 w-full text-center rounded-lg">
               <h3 className="font-bold text-2xl">Welcom back</h3>
            </div>

            <div className="flex flex-col p-6 w-full">
               <p className="text-sm text-center text-txt-gray">
                  Create new account?
                  <Link to="/signup" className="font-semibold text-primary"> Sing Up</Link>
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
                  <button id='sub-btn' onClick={() => { sendData() }} className="bg-primary text-white m-auto mt-1.5 w-2/5 rounded-md p-2">Login</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Login
