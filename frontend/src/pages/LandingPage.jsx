import Navbar from "../components/navbar"
import backgroundImage from "../assets/bg-screen.png"
import Logo from '../assets/nexync.png';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Full-screen background image */}
      <div
  className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
  style={{ backgroundImage: `url(${backgroundImage})` }}
    />
     
      {/* Transparent Navbar */}
      <Navbar/>
        
      {/* Main Landing Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className=" p-12 rounded-lg backdrop-blur-sm max-w-8xl w-full">
          <div className="relative mt-8">
            {/* Large Logo */}
            <img 
                src={Logo}
                alt="Nexync Logo" 
                className="h-60 w-auto mx-auto" 
            />

            {/* Text on top of the logo */}
            <h1 className="font-helvetica absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[300%] text-4xl font-light text-[#447EB8]">
                welcome to
            </h1>
            <p className="font-helvetica absolute top-1/2 left-1/2 transform -translate-x-[-62%] -translate-y-[-160%] text-xl font-light text-[#ADD3FF]">
                Next Generation Project Sync
            </p>
            </div> 

            <h1 className="font-helvetica center text-xl font-light text-white">
                an all-in-one project management platform built for the next generation of work.
            </h1>    
          
          <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
            <div className="text-white">
              <p className="mb-2">first time visiting here ?</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300">
                register now
              </button>
            </div>
            
            <div className="text-white">
              <p className="mb-2">been here before ?</p>
              <button className="w-full bg-transparent hover:bg-white hover:bg-opacity-20 text-white font-bold py-3 px-4 rounded border border-white transition duration-300">
                login
              </button>
            </div>
            
            <button className="text-white hover:underline mt-4">
              next time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;