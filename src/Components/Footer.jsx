import logo from '../images/logo.svg'

function Footer() {
   return (
      <footer className='mb-12 md:mb-0 mt-2.5'>
         <div className="border-t border-[text-txt-gray]">
            <div className="container">
               <div className='py-4 md:py-8 flex md:justify-between justify-center items-center flex-wrap'>
                  <div className='my-2 md:my-0'>
                     <img src={logo} alt="" />
                  </div>
                  <div className='my-2 md:my-0 w-full md:w-auto'>
                     <p className='font-bold'>JOIN OUR COMMUNITY</p>
                     <input type="text" placeholder='Enter your email' className='border border-[text-txt-gray] rounded-full px-4 py-0.5 outline-none' />
                  </div>
               </div>
               <div className='border-t border-[text-txt-gray] py-2'>
                  <p className='text-sm text-txt-gray'>Copyright © 2021 UI8 LLC. All rights reserved</p>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer