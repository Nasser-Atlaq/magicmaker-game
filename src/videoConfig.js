// Video configuration for the game
// Each challenge has a pair of videos - one AI-generated and one real

export const videoChallenges = [
  {
    id: 1,
    aiVideo: "/videos/ai-1.mp4",
    realVideo: "/videos/real-1.mp4"
  },
  {
    id: 2,
    aiVideo: "/videos/ai-2.mp4",
    realVideo: "/videos/real-2.mp4"
  },
  {
    id: 3,
    aiVideo: "/videos/ai-3.mp4",
    realVideo: "/videos/real-3.mp4"
  },
  {
    id: 4,
    aiVideo: "/videos/ai-4.mp4",
    realVideo: "/videos/real-4.mp4"
  },
  {
    id: 5,
    aiVideo: "/videos/ai-5.mp4",
    realVideo: "/videos/real-5.mp4"
  }
];

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get a randomized order of all challenges for a new game
export const getShuffledChallenges = () => {
  return shuffleArray(videoChallenges);
};

// Function to get a randomized challenge (with left/right randomization)
export const getRandomizedChallenge = (challenge) => {
  // Randomly decide if AI video goes on left or right
  const aiOnLeft = Math.random() < 0.5;

  return {
    leftVideo: aiOnLeft ? challenge.aiVideo : challenge.realVideo,
    rightVideo: aiOnLeft ? challenge.realVideo : challenge.aiVideo,
    correctSide: aiOnLeft ? 'left' : 'right'
  };
};
