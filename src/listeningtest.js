import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'

import WaveSurfer from "wavesurfer.js";
import { list } from "postcss";
import {v4 as uuidv4} from 'uuid'

// ... Import other audio files

const ProgressBar = ({ currentClipIndex, totalClips }) => {
  const progress = ((currentClipIndex + 1) / totalClips) * 100; // Calculate progress percentage
  const progressText = `Sample ${currentClipIndex + 1} / ${totalClips}`;

  return (
    <div className=" w-1/2 h-3 bg-gray-300 mb-32 rounded-full">
      <div
        className="progress h-full bg-sky-600 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
      <div className="progress-text flex flex-row justify-center align-middle font-roboto font-bold p-4">
        {progressText}
      </div>
    </div>
  );
};

const ListeningTest = () => {
  const [audioClips, setAudioClips] = useState([]);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [tonalRating, setTonalRating] = useState(1);
  const [harmonicRating, setHarmonicRating] = useState(1);
  const [totalRating, setTotalRating] = useState(1);

  const [clipFilename, setClipFilename] = useState(0);
  const [answers, setAnswers] = useState([]);

  const generatedaudioFolder = "./samples_generated"; // Update this path to your audio folder
  const basedaudioFolder = "./samples_base";
  const audioFileExtension = ".mp3"; // Update this to the correct file extension

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const supabase = createClient('https://qlotvqlvudryzotpthbe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsb3R2cWx2dWRyeXpvdHB0aGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMzMTQyNjMsImV4cCI6MjAwODg5MDI2M30.vWxKAdJ1rYr1j3WTT5i4SyNIPlEWKDnvwIcVYpcQMcQ')

  useEffect(() => {
    // Fetch the list of audio files from the folder
    fetchAudioFiles();
  }, []);

  useEffect(() => {
    if (audioClips.length > 0 && currentClipIndex < audioClips.length) {
      loadAudioClip(audioClips[currentClipIndex]);
    }
  }, [audioClips, currentClipIndex]);

  const loadAudioClip = (clipFilename) => {
    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "violet",
      progressColor: "purple",
      barHeight: 1,
      responsive: true,
      autoplay: false,
      mediaControls: true,
      height: 100,
    });
    console.log(clipFilename);
    wavesurfer.current.load(clipFilename);
    setClipFilename(clipFilename);
  };

  const navigate = useNavigate();

  const importAll = (r) => {
    return r.keys().map(r);
  };

  const getRandomFiles = (filesArray, count) => {
    const shuffledArray = [...filesArray].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const fetchAudioFiles = async () => {
    try {
      const baseaudioFiles = importAll(
        require.context("./samples_base/", false, /\.(mp3)$/)
      );
      const generatedaudioFiles = importAll(
        require.context("./samples_generated/", false, /\.(mp3)$/)
      );

      const randomBaseFiles = getRandomFiles(baseaudioFiles, 5);
      const randomGeneratedFiles = getRandomFiles(generatedaudioFiles, 5);

      // Combine the random files into a single array
      const audioFiles = [...randomBaseFiles, ...randomGeneratedFiles];

      setAudioClips(audioFiles);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    }
  };

  const generateRandomUserId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

    const userID = generateRandomUserId();

  const handleNextClick = async () => {
    // Record the current ratings for the current clip

    const answerData = {
      userId: userID,
      cliptitle: clipFilename,
      rhythmic: tonalRating,
      harmonic: harmonicRating,
      overall: totalRating,
      
      
    };

    setAnswers((prevAnswers) => [...prevAnswers, answerData]);

    // Move to the next clip
    if (currentClipIndex < audioClips.length - 1) {
      setCurrentClipIndex((prevIndex) => prevIndex + 1);
      setTonalRating(1);
      setHarmonicRating(1);
      setTotalRating(1);
    } else {
      // User has completed all clips, navigate to thank you page
      console.log(answers)
      // answers.forEach((answer) => sendresults(answer))
      sendresultsall(answers)
      navigate("/bream_listen/thankyou");
    }
  };

  const sendresults = async (answer) => {
      const {error} = await supabase.from('answers').insert(answer)
      console.log(error)
  }

  const sendresultsall = async (answers) => {
    const {error} = await supabase.from('answers').insert(answers)
    console.log(error)
}

  const handlePrevClick = () => {
    // Move to the previous clip
    setCurrentClipIndex((prevIndex) => prevIndex - 1);

    // Remove the previous answer from the answer array
    setAnswers((prevAnswers) => prevAnswers.slice(0, -1));

    // Reset the ratings to the values of the previous clip
    const previousAnswer = answers[currentClipIndex - 1];
    if (previousAnswer) {
      setTonalRating(previousAnswer.tonal);
      setHarmonicRating(previousAnswer.harmonic);
      setTotalRating(previousAnswer.overall);
    }
  };


  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center py-10 px-52 font-roboto">
      <h1 className="text-4xl font-bold text-black mb-10">Listening Test</h1>
      <p className=" mb-32">Instructions here</p>
      <ProgressBar
        currentClipIndex={currentClipIndex}
        totalClips={audioClips.length}
      />

      {/* Audio Player for the Current Clip */}
      <div ref={waveformRef} className="w-2/3 flex flex-col space-y-6" />

      {/* Sliders */}
      <div className="flex flex-row items-center justify-evenly space-x-32 mt-20 w-1/2">
        <div className="slider-container">
          <input
            type="range"
            className="rating-slider h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            min="1"
            max="5"
            value={tonalRating}
            onChange={(e) => setTonalRating(parseFloat(e.target.value))}
          />

          <label>Rhythmic Rating: {tonalRating}</label>
        </div>
        <div className="slider-container">
          <input
            type="range"
            className="rating-slider h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            min="1"
            max="5"
            value={harmonicRating}
            onChange={(e) => setHarmonicRating(parseFloat(e.target.value))}
          />
          <label>Harmonic Rating: {harmonicRating}</label>
        </div>
        <div className="slider-container">
          <input
            type="range"
            className="rating-slider h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            min="1"
            max="5"
            value={totalRating}
            onChange={(e) => setTotalRating(parseFloat(e.target.value))}
          />
          <label>Overall Rating: {totalRating}</label>
        </div>
      </div>

      {/* Next Button */}
      <div className="w-full flex flex-row justify-center space-x-5">
        <button
          onClick={handlePrevClick}
          disabled={currentClipIndex === 0}
          className={`button prev-button mt-8 px-6 py-2 bg-pink-500 hover:bg-pink-700 transition-all duration-75 active:scale-95 active:bg-pink-300  shadow-lg hover:shadow-md shadow-gray-300 hover:shadow-gray-700 text-white text-xl font-bold rounded-full ${
            currentClipIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          PREVIOUS
        </button>
        <button
          onClick={handleNextClick}
          className={`mt-8 px-6 py-2 bg-blue-500 hover:bg-blue-700 shadow-lg hover:shadow-md transition-all active:scale-95 active:bg-blue-300 duration-75 shadow-gray-300 hover:shadow-gray-700 text-white text-xl font-bold rounded-full ${
            tonalRating === 0 || harmonicRating === 0 || totalRating === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            tonalRating === 0 || harmonicRating === 0 || totalRating === 0
          }
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default <ListeningTest />;
