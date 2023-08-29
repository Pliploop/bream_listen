import React from 'react';
import sonycsl from './csl.png'

function ThankYou() {
  return (
    <div className="text-center flex flex-col justify-center align-middle items-center font-roboto content-center space-around mt-64">
      <h1 className='text-4xl'>Thank You for Participating!</h1>
      <p className='lg:text-2xl text-gray-500'>Your responses have been recorded.</p>
      <img src={sonycsl} alt='sonycsl' className='w-32 lg:mt-0 mt-12'/>
      <div className=" p-4 rounded-lg text-center text-purple-300 mb-4">
        <h2 className="text-xl font-semibold mb-2 mt-10">Contact Us</h2>
        <p>
          For any questions or feedback, email us at{" "}
          <a
            href="jul.guinot@gmail.com"
            className="underline hover:text-purple-700"
          >
            jul.guinot@gmail.com
          </a>
          .
        </p>
        <p className="mt-10 text-purple-200">Julien Guinot, Stefan Lattner</p>
      </div>
    </div>
    
  );
}

export default <ThankYou/>;