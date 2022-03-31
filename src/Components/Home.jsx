import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import MainPic from "../images/main-pic-1.jpg";

function Home() {
  const [Last3Elm, setLast3Elm] = useState([]);

  async function getPlaces() {
    const request = await fetch('http://localhost:3001/places', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    var response = await request.json();

    return response;
  }

  useEffect(() => {
    getPlaces().then(res => {
      let numOfElm;
      if (res.length >= 3) {
        numOfElm = 3;
      } else if (res.length === 2) { numOfElm = 2 } else { numOfElm = 1 };

      var last3 = [];
      for (let i = res.length - 1; i >= res.length - numOfElm; i--) {
        last3.push(res[i]);
      }
      setLast3Elm(last3);
    });
  }, [])

  return (
    <section>
      <div className="md:container my-6 text-txt-black">
        <div className="relative md:rounded-3xl h-[85vh] overflow-hidden">
          <img className="h-full w-full object-cover absolute top-0 left-0 -z-10" src={MainPic} />
          <div className="pl-10 pt-20">
            <h3 className="text-4xl md:text-7xl font-bold font-header">Air, sleep,<br /> dream</h3>
            <p>Find and book a great experience.</p>
          </div>
        </div>
      </div>
      <div className="container py-3 text-txt-black">
        <div className="flex flex-col h-full md:h-screen justify-center items-center">
          <div className="text-center">
            <h3 className="md:text-6xl text-4xl font-header font-bold">Travel to make memories all around the world</h3>
            <p className="md:text-2xl text-xl text-txt-gray">Find trips that fit a flexible lifestyle</p>
          </div>
          <div className="flex flex-wrap my-8">
            <div className="flex md:flex-1 flex-col items-baseline md:px-2 py-4 md:py-0">
              <span className="px-2.5 py-0.5 bg-[#8BC5E5] text-white font-bold rounded-full text-sm">01</span>
              <h4 className="text-xl py-2 font-bold font-header">Find trips that fit a flexible lifestyle</h4>
              <p className="text-txt-gray text-sm">untur, aut, ut temporibus porro nobis amet tempora laboriosam. Soluta, laudantium possimus.
                Possimus aliquam rerum facere repellat impedit excepturi aut consectetur officiis nisi consequuntur Soluta</p>
            </div>
            <div className="flex md:flex-1 flex-col items-baseline md:px-2 py-4 md:py-0">
              <span className="px-2.5 py-0.5 bg-[#92A5EF] text-white font-bold rounded-full text-sm">02</span>
              <h4 className="text-xl py-2 font-bold font-header">Travel with more confidence</h4>
              <p className="text-txt-gray text-sm">untur, aut, ut temporibus porro nobis amet tempora laboriosam. Soluta, laudantium possimus.
                Possimus aliquam rerum facere repellat impedit excepturi aut consectetur officiis nisi consequuntur optio</p>
            </div>
            <div className="flex md:flex-1 flex-col items-baseline md:px-2 py-4 md:py-0">
              <span className="px-2.5 py-0.5 bg-[#58C27D] text-white font-bold rounded-full text-sm">03</span>
              <h4 className="text-xl py-2 font-bold font-header">See what’s really included</h4>
              <p className="text-txt-gray text-sm">untur, aut, ut temporibus porro nobis amet tempora laboriosam. Soluta, laudantium possimus.
                Possimus aliquam rerum facere repellat impedit aut consectetur nisi consequuntur repellat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-3 text-txt-black">
        <div className="flex flex-col h-full items-center">
          <div className="text-center">
            <h3 className="md:text-6xl text-4xl font-header font-bold">Live anywhere</h3>
            <p className="md:text-2xl text-xl text-txt-gray">Keep calm & travel on</p>
          </div>
          <div className="flex flex-wrap justify-center my-8">
            {Last3Elm.map((elm, index) => {
              return <div key={index} className="md:flex-1 md:px-3 py-2">
                <Link to='/'>
                  <img className="h-80 w-full object-cover rounded-xl" src={require(`../Upload_images/${elm.image1}`)} />
                  <h3 className="font-header font-bold pt-3 text-xl">{elm.Title}</h3>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-txt-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="pl-1 text-xs font-medium text-txt-gray">{elm.Address}</p>
                  </div>
                </Link>
                <p className="float-right text-sm font-medium mt-3"><span>${elm.Price}</span>/night</p>
              </div>
            })}
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  )
}

export default Home;