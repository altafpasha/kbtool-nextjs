import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const SubscriptionPopup = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pollResult, setPollResult] = useState(null);
  const [interestPercentage, setInterestPercentage] = useState(null);
  const [totalInterestedVotes, setTotalInterestedVotes] = useState(0);
  const [totalNotInterestedVotes, setTotalNotInterestedVotes] = useState(0);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackReason, setFeedbackReason] = useState('');

  // Fetch initial poll statistics
  useEffect(() => {
    const fetchPollStats = async () => {
      try {
        const { count: totalVotes, error: countError } = await supabase
          .from('pro_tool_poll')
          .select('*', { count: 'exact' });

        const { count: interestedVotes, error: interestedError } = await supabase
          .from('pro_tool_poll')
          .select('*', { count: 'exact' })
          .eq('interested', true);

        const { count: notInterestedVotes, error: notInterestedError } = await supabase
          .from('pro_tool_poll')
          .select('*', { count: 'exact' })
          .eq('interested', false);

        if (countError || interestedError || notInterestedError) {
          throw (countError || interestedError || notInterestedError);
        }

        // Calculate percentage of interested votes
        const percentage = totalVotes > 0 
          ? Math.round((interestedVotes / totalVotes) * 100) 
          : null;
        
        setInterestPercentage(percentage);
        setTotalInterestedVotes(interestedVotes);
        setTotalNotInterestedVotes(notInterestedVotes);
      } catch (error) {
        console.error('Error fetching poll statistics:', error);
      }
    };

    fetchPollStats();
  }, [pollResult]);

  const handlePollVote = async (interested) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pro_tool_poll')
        .insert([{ 
          interested: interested,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setPollResult(interested);
      
      if (!interested) {
        setShowFeedbackForm(true);
        setMessage(
            "We're sorry to hear you're not interested. Help us improve by sharing why.\n\n" +
            "Unfortunately, due to a significant number of users opting out, we are unable to continue offering the KBTool for free. This service may be discontinued entirely in the coming days. Thank you for your understanding."
        );
      } else {
        setMessage(
          "Thank you for your interest! We're excited to share more about our Pro tools soon."
        );
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('pro_tool_feedback')
        .insert([{ 
          name: feedbackName,
          reason: feedbackReason,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setMessage('Thank you for your feedback! We appreciate your help in improving our service.');
      setShowFeedbackForm(false);
      setFeedbackName('');
      setFeedbackReason('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('An error occurred while submitting feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl w-full max-w-md overflow-hidden border border-white/20 shadow-2xl">
        {/* Top Decorative Bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        {/* Main Content */}
        <div className="p-6">
          {/* Subscription Alert Section */}
          <div className="mb-6 bg-white/5 rounded-xl border border-white/10 p-5">
            <div className="flex items-center space-x-4">
              <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h2 className="text-lg font-bold text-white">Pro Subscription</h2>
                <p className="text-xs text-white/70">
                  Unlock Advanced Productivity Tools
                </p>
              </div>
            </div>

            {/* Votes Count */}
            {interestPercentage !== null && (
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.576 2.02L7 11H4a2 2 0 00-2 2v2a2 2 0 002 2h2.5" />
                  </svg>
                  <span className="text-white/80 font-medium">{totalInterestedVotes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 016.447 3h4.836a2 2 0 011.789 2.894l-3.5 7A2 2 0 018.763 14H10zm0 0l4-8m-4 8v4a1 1 0 001 1h.5a1 1 0 001-1v-4m-3-6h6m-3 0l-.5-1H7l.5 1z" />
                  </svg>
                  <span className="text-white/80 font-medium">{totalNotInterestedVotes}</span>
                </div>
              </div>
            )}

            {/* Existing Subscription Content */}
            <div className="mt-4 text-sm text-white/80">
              <p className="mb-2">
                Upgrade your productivity with our KB-Tool and AI-powered Pro Tools.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Advanced AI features</li>
                <li>AI-powered company insights</li>
                <li>AI Image Translator for seamless communication</li>
                <li>Continuous tool improvements</li>
                <li>Priority support</li>
              </ul>
              <p className="mt-2">
                We are actively building new tools and features to empower your productivity and enhance your skills. Your support and interest mean the world to us and help keep this service alive.
              </p>
              
              <p className="mt-2 text-xs text-white/60">
                <strong className="text-yellow-400">Only ₹50/month</strong> to support ongoing innovation and gain access to these premium features and out KB-tool.
              </p>
            </div>


          </div>

          {/* Feedback Form for Not Interested 
          {showFeedbackForm ? (
            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <input 
                type="text" 
                placeholder="Your Name (Optional)" 
                value={feedbackName}
                onChange={(e) => setFeedbackName(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                placeholder="Why aren't you interested? (Optional)"
                value={feedbackReason}
                onChange={(e) => setFeedbackReason(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-white/70 text-center">
                Are you interested in our Pro Tools?
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => handlePollVote(true)}
                  disabled={loading || pollResult !== null}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Interested
                </button>
                <button
                  onClick={() => handlePollVote(false)}
                  disabled={loading || pollResult !== null}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Not Interested
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center mt-3">
              <svg className="w-5 h-5 animate-spin text-white/70" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}

          {message && (
            <div className={`text-sm text-center mt-3 ${pollResult === false ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </div>
          )}

          {/* Interest Percentage */}
          {interestPercentage !== null && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Interested</span>
                <span>{interestPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                  style={{ width: `${interestPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-white/70 mt-1">
                <span>Not Interested</span>
                <span>{100 - interestPercentage}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPopup;