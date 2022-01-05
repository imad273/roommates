import { useEffect, useState } from 'react'
import Map from './Map'

function Search() {
   const params = new URLSearchParams(window.location.search);

   const [keyword, setkeyword] = useState(params.get('keyword'));
   const [Data, setData] = useState([]);

   const [MapMobile, setMapMobile] = useState(false);

   async function GetTheData() {

      const request = await fetch(`http://localhost:3001/search?keyword=${keyword}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json'
         }
      })

      const response = await request.json();
      setData(response);
   }

   useEffect(() => {
      GetTheData()
   }, [])

   return (
      <div>
         <div className="container flex flex-wrap py-4">
            <div className="md:flex-1 m-1">
               <div className="mb-4">
                  <h3 className="font-header font-medium text-xl">Apartments in {keyword}</h3>
                  <p className="text-txt-gray text-sm"><span>{Data.length}</span> result</p>
               </div>
               {Data.map((result, index) => {
                  let images = JSON.parse(result.Images);
                  return <div key={index} className="shadow-mine rounded-xl">
                     <div className="flex w-full my-2 relative">
                        <div className='m-4'>
                           <img className='w-48 h-32 object-cover rounded-xl' src={require(`../Upload_images/${images[0]}`)} />
                        </div>
                        <div className="w-full my-4 mr-2">
                           <h3 className='font-header font-medium'>{result.Title}</h3>
                           <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-txt-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <p className="pl-1 text-xs font-medium text-txt-gray">{result.Address}</p>
                           </div>
                           <p className="text-sm font-medium mt-3 absolute bottom-3 right-4">${result.Price}<span>/night</span></p>
                        </div>
                     </div>
                  </div>
               })}
            </div>
            <div className={`md:flex-1 md:block md:static md:m-1 ${MapMobile ? `block` : 'hidden'} absolute left-0 z-30 bg-white w-full`}>
               <button className='block md:hidden bg-primary m-[15px] text-white rounded-br-xl rounded-tl-xl px-2 py-1 absolute z-40' onClick={() => { setMapMobile(false) }}>Back</button>
               <Map keyword={keyword} />
            </div>
         </div>
         <div className={`fixed bottom-20 ${MapMobile ? `hidden` : 'block'} md:hidden w-full flex justify-center`}>
            <button className='bg-primary text-white font-bold shadow-mine px-3 py-1 rounded-full border' onClick={() => { setMapMobile(true) }}>Show Map</button>
         </div>
      </div>
   )
}

export default Search
