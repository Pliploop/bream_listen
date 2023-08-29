import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduction from './introduction';
import ListeningTest from './listeningtest';
import ThankYou from './thanks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bream_listening" element={Introduction} />
        <Route path="/bream_listening/listening" element={ListeningTest} />
        <Route path="/bream_listening/thankyou" element={ThankYou} />
      </Routes>
    </Router>
  );
}

export default App;