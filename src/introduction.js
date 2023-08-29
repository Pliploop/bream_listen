import React, { useState } from "react";
import { Link } from "react-router-dom";
import sonycsl from "./csl.png"

const QuestionBox = ({ question }) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <label className="block mb-2 font-semibold">{question}</label>
      <select className="w-full p-2 border rounded">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>
  );
};

const Introduction = () => {
  const questions = [
    { question: "Question 1", options: ["", "", ""] },
    { question: "Question 2", options: ["", "", ""] },
    // Add more questions as needed
  ];

  const initialAnswers = questions.map(() => '');
  const [answers, setAnswers] = useState(initialAnswers);

  // Check if any answer is an empty string
  const isAnyAnswerEmpty = answers.some(answer => answer.trim() === '');

  return (
    <div className="bg-white  flex flex-col justify-center items-center px-2 py-10 lg:py-32 lg:px-52 font-roboto">
    
      <h1 className="text-4xl font-bold text-black lg:mb-5 w-full align-middle justify-center text-center">
        Bass-BREAM 
      </h1>

      <h2 className="text-2xl font-bold text-gray-600 lg:mb-20 mb-10">
        Subjective listening test
      </h2>

      <div className="flex lg:flex-row flex-col">
      <div className=" lg:w-1/2 lg:px-6 px-2 text-sm lg:text-base text-justify">
      <p className="text-black  p-2">
        Welcome to this subjective listening test, and thank you for
        participating!
      </p>

      <p className="text-black  p-2">
        The objective of this listening test is to evaluate the
        "appropriateness" of generated basslines with regards to a given
        accompaniment. In this test you will be presented with 10 audio samples,
        in which an audio accompaniment and a bassline will be present.
      </p>

      <p className="text-black  p-2">
        For each of these samples, you will be asked to evaluate on a scale from
        1 to 5 the tonal, rhythmic, and overall quality of the bassline *as it
        related to the accompaniment*. e.g. if the bassline corresponds very
        well rhythmically to the accompaniment, but not tonally/ harmonically,
        you might grade it 5-1-3.
      </p>

      <p className="text-black  p-2">
        Each audio excerpt will last 30 seconds. the test will take
        approximately 10 minutes. The basslines have been transposed up an
        octave for better audition on lesser sound systems, but the test is best
        conducted in a silent environment with headphones.
      </p>
      </div>

      <div className="flex justify-evenly lg:py-0 py-6 lg:flex-col flex-row items-center lg:w-1/2">
      <img src={sonycsl} alt="SonyCSL" className="lg:scale-100 lg:w-full w-1/4"/>
      <Link
        to="/bream_listen/listening"
        disabled={isAnyAnswerEmpty}
        className={`text-white font-bold lg:px-20 lg:py-4 py-3 px-6 rounded-full  text-xl bg-blue-400 border-blue-900 border-[1px] shadow-sm hover:shadow-lg lg:mt-10 hover:bg-blue-700 active:scale-95 transition-all duration-75 shadow-black ${
          isAnyAnswerEmpty ? '' : 'opacity-50 cursor-not-allowed}'
        }`}
      >
        START TEST
      </Link>

      
      </div>
      </div>
      <div className=" p-4 rounded-lg text-center text-purple-300 mb-4">
        <h2 className="text-xl font-semibold mb-2 lg:mt-10">Contact Us</h2>
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
};

export default <Introduction />;
