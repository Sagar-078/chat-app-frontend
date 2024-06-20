import React, { useState } from 'react'
import bgImage from "../assets/Images/bgimage.jpg"
import Form from '../Components/Form';
import Loader from '../Components/Loader';

const Home = () => {

  const [loading, setLoading] = useState(true);

  return (
    <div className='h-[100vh] w-[100vw]'>

      {
        loading &&
        <Loader/>
      }

      <div className={`h-[100vh] w-[100vw] relative flex bg-zinc-700 ${loading ? " hidden" : ""}`} onLoad={() => setLoading(false)}>
        
        <div className={` h-full w-full `} onLoad={() => setLoading(false)}>

          <img src={bgImage} alt='' className={`h-full w-full `}/>
        </div>

        <div className='flex justify-center items-center h-full w-full absolute' onLoad={() => setLoading(false)}>
          <Form/>
        </div>

      </div>
    </div>
  )
}

export default Home