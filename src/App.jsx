import { useState, useEffect } from 'react';
import PhoneVerificationScreen from './components/PhoneVerificationScreen';
import WelcomeScreen from './components/WelcomeScreen';
import VideoComparisonScreen from './components/VideoComparisonScreen';
import CongratulationsScreen from './components/CongratulationsScreen';
import FailureScreen from './components/FailureScreen';
import { getRandomizedChallenge, getShuffledChallenges } from './videoConfig';

function App() {
  // Game state - easily expandable for future screens
  const [gameState, setGameState] = useState('phoneVerification'); // 'phoneVerification', 'welcome', 'playing', 'failure', 'congratulations'
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [shuffledChallenges, setShuffledChallenges] = useState([]);

  // Load a new challenge when question changes
  useEffect(() => {
    if (currentQuestion > 0 && currentQuestion <= 5 && shuffledChallenges.length > 0) {
      const challengeData = shuffledChallenges[currentQuestion - 1];
      const challenge = getRandomizedChallenge(challengeData);
      setCurrentChallenge(challenge);
    }
  }, [currentQuestion, shuffledChallenges]);

  // Handle phone verification
  const handlePhoneVerify = (phoneNumber) => {
    setVerifiedPhoneNumber(phoneNumber);
    setGameState('welcome');
  };

  // Handle start game
  const handleStart = () => {
    // Shuffle challenges for a new game
    setShuffledChallenges(getShuffledChallenges());
    setGameState('playing');
    setCurrentQuestion(1);
    setScore(0);
  };

  // Handle video selection
  const handleVideoSelection = (selectedSide) => {
    if (!currentChallenge) return;

    // Check if the selected side is correct
    const isCorrect = selectedSide === currentChallenge.correctSide;

    // Update score if correct
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    if (currentQuestion < 5) {
      // Move to next challenge
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All 5 challenges completed - check final score
      if (newScore === 5) {
        // Perfect score - show congratulations
        setGameState('congratulations');
      } else {
        // Failed to get perfect score - show failure with score
        setGameState('failure');
      }
    }
  };

  // Render current screen based on game state
  return (
    <div className="w-full h-screen bg-black">
      {gameState === 'phoneVerification' && (
        <PhoneVerificationScreen onVerify={handlePhoneVerify} />
      )}

      {gameState === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {/* Video Comparison Screen */}
      {gameState === 'playing' && currentChallenge && (
        <VideoComparisonScreen
          onNext={handleVideoSelection}
          questionNumber={currentQuestion}
          totalQuestions={5}
          leftVideo={currentChallenge.leftVideo}
          rightVideo={currentChallenge.rightVideo}
        />
      )}

      {gameState === 'congratulations' && (
        <CongratulationsScreen score={score} totalQuestions={5} />
      )}

      {gameState === 'failure' && (
        <FailureScreen score={score} totalQuestions={5} />
      )}
    </div>
  );
}

export default App;
