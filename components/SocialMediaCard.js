import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  RefreshCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Send 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';


const SocialMediaCard = () => {
  const [pollStats, setPollStats] = useState({
    totalVotes: 0,
    interestedVotes: 0,
    notInterestedVotes: 0,
    interestedPercentage: 0
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    reason: ''
  });

  // Fetch poll statistics
  const fetchPollStats = async () => {
    try {
      const { data, error } = await supabase
        .from('poll_statistics_view')
        .select('*')
        .single();

      if (error) throw error;

      setPollStats({
        totalVotes: data.total_votes || 0,
        interestedVotes: data.interested_votes || 0,
        notInterestedVotes: data.not_interested_votes || 0,
        interestedPercentage: data.interested_percentage || 0
      });
    } catch (error) {
      console.error('Error fetching poll stats:', error);
    }
  };

  // Submit poll vote
  const submitVote = async (interested) => {
    try {
      const { error } = await supabase
        .from('pro_tool_poll')
        .insert({ 
          interested,
          ip_address: await getIpAddress(),
          user_agent: navigator.userAgent 
        });

      if (error) throw error;

      setHasVoted(true);
      fetchPollStats();
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  // Submit feedback
  const submitFeedback = async () => {
    try {
      const { error } = await supabase
        .from('pro_tool_feedback')
        .insert(feedbackData);

      if (error) throw error;

      setFeedbackModalOpen(false);
      setFeedbackData({ name: '', email: '', reason: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Get IP Address (simple method, can be improved)
  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  useEffect(() => {
    fetchPollStats();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
      {/* SVG Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <svg 
          className="absolute w-full h-full opacity-20"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
        >
          {/* Animated Background Lines */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#4B0082" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          
          {/* Animated Curved Lines */}
          <path 
            d="M0,160 Q360,260 720,200 Q1080,140 1440,160 L1440,320 L0,320 Z" 
            fill="url(#lineGradient)"
            className="animate-wave-1"
          />
          <path 
            d="M0,180 Q360,240 720,220 Q1080,200 1440,180 L1440,320 L0,320 Z" 
            fill="url(#lineGradient)"
            className="animate-wave-2"
          />
        </svg>
      </div>

      {/* Card Content */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 m-4 w-full max-w-xl flex flex-col items-center border border-purple-800/20">
        {/* Refresh Icon */}
        <div 
          className="absolute top-4 right-4 cursor-pointer hover:rotate-180 transition-transform duration-500"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw 
            size={24} 
            className="text-purple-400 hover:text-purple-600"
          />
        </div>

        {/* Enhanced Title */}
        <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 leading-tight">
          Pro Subscription
          <span className="block mt-3 text-lg text-gray-300 font-normal">
            Elevate Your Productivity
          </span>
        </h2>
        
        <p className="text-center text-gray-300 mb-6 px-4">
          Unlock cutting-edge AI tools including advanced insights, 
          AI Image Translator, and productivity-boosting features.
        </p>
        
        {/* Pricing Section */}
        <div className="bg-purple-900/20 rounded-xl p-6 mb-6 w-full text-center">
          <p className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              ₹50
            </span>
            <span className="text-xl ml-2 text-gray-400">/month</span>
          </p>
          <p className="text-sm text-gray-400">
            Support innovation and unlock premium features including KBTool
          </p>
        </div>

        {/* Poll Section */}
        <div className="w-full bg-purple-900/10 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-center mb-4 text-purple-300">
            Are You Interested in This Pro Subscription?
          </h3>
          
          {!hasVoted ? (
            <div className="flex justify-center space-x-8">
              <button 
                onClick={() => submitVote(true)}
                className="bg-green-500/20 hover:bg-green-500/40 p-4 rounded-full transition-colors"
              >
                <ThumbsUp size={32} className="text-green-500" />
              </button>
              <button 
                onClick={() => submitVote(false)}
                className="bg-red-500/20 hover:bg-red-500/40 p-4 rounded-full transition-colors"
              >
                <ThumbsDown size={32} className="text-red-500" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Total Votes: {pollStats.totalVotes}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <div 
                  className="bg-green-500 h-4 rounded-full" 
                  style={{width: `${pollStats.interestedPercentage}%`}}
                />
              </div>
              <p className="text-sm text-gray-400">
                {pollStats.interestedVotes} Interested 
                ({pollStats.interestedPercentage.toFixed(2)}%)
              </p>
              <button 
                onClick={() => setFeedbackModalOpen(true)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
              >
                <Send size={16} className="mr-2" /> Share Feedback
              </button>
            </div>
          )}
        </div>
        
        <p className="text-center text-xs text-gray-500 mb-6 px-4">
          We have been providing free services for 3 years. Your support helps us continue developing innovative solutions. Without sufficient support, we may be forced to shut down this service as we are unable to handle the expenses.
        </p>
        
        {/* Feedback Modal */}
        {feedbackModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                Share Your Feedback
              </h3>
              <input 
                type="text" 
                placeholder="Your Name"
                className="w-full mb-4 p-2 bg-white/10 border border-purple-500/30 rounded-lg text-white"
                value={feedbackData.name}
                onChange={(e) => setFeedbackData({...feedbackData, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Your Email"
                className="w-full mb-4 p-2 bg-white/10 border border-purple-500/30 rounded-lg text-white"
                value={feedbackData.email}
                onChange={(e) => setFeedbackData({...feedbackData, email: e.target.value})}
              />
              <textarea 
                placeholder="Why are you interested/not interested?"
                className="w-full mb-4 p-2 bg-white/10 border border-purple-500/30 rounded-lg text-white h-32"
                value={feedbackData.reason}
                onChange={(e) => setFeedbackData({...feedbackData, reason: e.target.value})}
              />
              <div className="flex justify-between">
                <button 
                  onClick={() => setFeedbackModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitFeedback}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaCard;

// Tailwind CSS Custom Animations
const styles = `
@keyframes wave-1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}
@keyframes wave-2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-wave-1 {
  animation: wave-1 15s ease-in-out infinite;
}
.animate-wave-2 {
  animation: wave-2 15s ease-in-out infinite;
}
`;