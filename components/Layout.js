import React, { useState, useEffect } from 'react';
import { Client, Databases, ID } from 'appwrite';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AutoSalaryCalculator from './AutoSalaryCalculator';
import CompanySearch from './CompanySearch';
import Footer from '../components/Footer';
import Button from './Button';
import ResetButton from './ResetButton';
import ZaubaButton from './ZaubaButton';
import SocialMediaCard from '../components/SocialMediaCard';
import AdPopup from './AdPopup';
import NotificationPopup from './NotificationPopup';
import SkewButton from './SkewButton';
import TextCleanerTool from './TextCleanerTool';
import Transaction from './Transaction';







const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const Layout = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [ids, setIds] = useState('');
  const [output, setOutput] = useState('Result will be displayed here');
  const [resetCounter, setResetCounter] = useState(0);
  const [customComments, setCustomComments] = useState([]);
  const [newCommentTitle, setNewCommentTitle] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('approved');
  const [autoMode, setAutoMode] = useState(true);
  const [autoReset, setAutoReset] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');



  useEffect(() => {
    fetchCustomComments();
    
    const storedAutoMode = JSON.parse(localStorage.getItem('autoMode'));
    const storedAutoReset = JSON.parse(localStorage.getItem('autoReset'));
    if (storedAutoMode !== null) setAutoMode(storedAutoMode);
    if (storedAutoReset !== null) setAutoReset(storedAutoReset);
  }, []);

  useEffect(() => {
    // ... existing useEffect code
    
    // Show ad popup on page load/refresh
    setShowAdPopup(true);

    // Show a notification after a short delay
    const timer = setTimeout(() => {
      setNotificationMessage('Welcome to KBTool! Hope you find it useful. custom comments buttons will save in database ');
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    localStorage.setItem('autoMode', JSON.stringify(autoMode));
  }, [autoMode]);

  useEffect(() => {
    localStorage.setItem('autoReset', JSON.stringify(autoReset));
  }, [autoReset]);

  const fetchCustomComments = async () => {
    setIsLoading(true);
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_CB_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_CB_COLLECTION_ID
      );
      setCustomComments(response.documents);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError('Failed to load comments. Please try again.');
    }
    setIsLoading(false);
  };

  const showTab = (tabId) => setActiveTab(tabId);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

 
  const addCustomComment = async () => {
    if (newCommentTitle && newCommentContent) {
      if (newCommentTitle.length > 10) {
        setError('Button Title should not exceed 10 characters. You can add more details in the comment area.');
        return;
      }
      setIsLoading(true);
      try {
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_CB_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_CB_COLLECTION_ID,
          ID.unique(),
          {
            title: newCommentTitle,
            content: newCommentContent,
          }
        );
        setNewCommentTitle('');
        setNewCommentContent('');
        fetchCustomComments(); // Refresh the list
        setNotificationMessage('Comment button added successfully. To delete a comment button, please contact the admin.');
        setShowNotification(true);
      } catch (error) {
        console.error('Error adding comment:', error);
        setError('Failed to add comment. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (selectedCommentIndex !== null) {
      setIsLoading(true);
      try {
        await databases.deleteDocument(
          process.env.NEXT_PUBLIC_APPWRITE_CB_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_CB_COLLECTION_ID,
          customComments[selectedCommentIndex].$id
        );
        setSelectedCommentIndex(null);
        fetchCustomComments(); // Refresh the list
      } catch (error) {
        console.error('Error deleting comment:', error);
        setError('Failed to delete comment. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const glassmorphismStyle = `
      bg-gradient-to-br from-black/70 to-gray-900/70
      backdrop-blur-3xl
      border-4 border-gray-600/50
      shadow-xl
      rounded-2xl
    `;

  const inputStyle = `
    bg-transparent
    border border-white/20
    text-white
    placeholder-white/50
    rounded-lg
    p-2
    w-full
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500
    transition
  `;

  const toggleStyle = `
    relative inline-flex items-center cursor-pointer
  `;

  const toggleLabelStyle = `
    ml-3 text-sm font-medium text-gray-300
  `;



  return (
    <div className="min-h-screen dark:bg-white bg-black dark:bg-dot-black/[0.2] bg-dot-white/[0.2] relative flex flex-col">
      <div className="flex-grow p-4 space-y-4">
      {copied && (
          <div className="bg-purple-600 text-white py-2 px-4 rounded text-sm mb-4">
            Copied to clipboard!
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className={`${glassmorphismStyle} p-4`}>
            <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(128,90,213,0.6)_0%,rgba(128,90,213,0)_75%)] opacity-50" />
            
            <div className="flex justify-around p-2 mb-4 bg-white/10 rounded-full">
              {['approved', 'reject', 'comments'].map((tab) => (
                <SkewButton key={tab} onClick={() => showTab(tab)} className={`text-xs sm:text-sm ${activeTab === tab ? 'bg-purple-500' : ''}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </SkewButton>
              ))}
            </div>
          

            <div className={`flex-wrap text-medium gap-2 ${activeTab === 'approved' ? 'flex' : 'hidden'}`}>
              <h5 className="font-bold text-white w-full">QID_109</h5>
              <CopyToClipboard text="salary_slip" onCopy={handleCopy}>
                <Button className="gap-2">salary_slip</Button>
              </CopyToClipboard>
              <CopyToClipboard text="bank_narration" onCopy={handleCopy}>
                <Button>bank_narration</Button>
              </CopyToClipboard>
              <CopyToClipboard text="company_id" onCopy={handleCopy}>
                <Button>company_id</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_101</h5>
              <CopyToClipboard text="not found" onCopy={handleCopy}>
                <Button>not found</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_061</h5>
              <CopyToClipboard text="Approved" onCopy={handleCopy}>
                <Button>Approved</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_102</h5>
              <CopyToClipboard text="KYC documents are proper" onCopy={handleCopy}>
                <Button>KYC</Button>
              </CopyToClipboard>
              <CopyToClipboard text="selfie" onCopy={handleCopy}>
                <Button>selfie</Button>
              </CopyToClipboard>
              <CopyToClipboard text="pan" onCopy={handleCopy}>
                <Button>pan</Button>
              </CopyToClipboard>
              <CopyToClipboard text="aadhaar" onCopy={handleCopy}>
                <Button>aadhaar</Button>
              </CopyToClipboard>
            </div>

            <div className={`flex-wrap gap-2 ${activeTab === 'reject' ? 'flex' : 'hidden'}`}>
              <h5 className="font-bold w-full">QID_108</h5>
              <CopyToClipboard text="NOT APPROVED" onCopy={handleCopy}>
                <Button>NOT APPROVED</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_109</h5>
              <CopyToClipboard text="NOT MATCH" onCopy={handleCopy}>
                <Button>NOT MATCH</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_101</h5>
              <CopyToClipboard text="not found" onCopy={handleCopy}>
                <Button>not found</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_061</h5>
              <CopyToClipboard text="Salary Mode is cash" onCopy={handleCopy}>
                <Button>cash</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Salary Mode is Cheque" onCopy={handleCopy}>
                <Button>Cheque</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Govt Employee" onCopy={handleCopy}>
                <Button>Govt Employee</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Self Employed" onCopy={handleCopy}>
                <Button>Self Employed</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Not a Salaried Employee" onCopy={handleCopy}>
                <Button>NOT-Sal</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Salary Irregular" onCopy={handleCopy}>
                <Button>Salary Irregular</Button>
              </CopyToClipboard>
              <h5 className="font-bold w-full">QID_102</h5>
              <CopyToClipboard text="KYC documents are proper" onCopy={handleCopy}>
                <Button>KYC</Button>
              </CopyToClipboard>
              <CopyToClipboard text="selfie" onCopy={handleCopy}>
                <Button>selfie</Button>
              </CopyToClipboard>
              <CopyToClipboard text="pan" onCopy={handleCopy}>
                <Button>pan</Button>
              </CopyToClipboard>
              <CopyToClipboard text="aadhaar" onCopy={handleCopy}>
                <Button>aadhaar</Button>
              </CopyToClipboard>
            </div>

            <div className={`flex-wrap gap-2 ${activeTab === 'comments' ? 'flex' : 'hidden'}`}>
              {customComments.map((comment, index) => (
                <CopyToClipboard key={index} text={comment.content} onCopy={handleCopy}>
                  <Button className="text-xs sm:text-sm">{comment.title}</Button>
                </CopyToClipboard>
              ))}
              <CopyToClipboard text="QID75-Latest 3-months statement not available, Need Recent 3/6 Months Bank Acc statement Hence Given Preset" onCopy={handleCopy}>
                <Button>QID-75</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Need valid id card or pay slips to confirm salary" onCopy={handleCopy}>
                <Button>id-payslip</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Need till date bank statement -- Hence given p-reset" onCopy={handleCopy}>
                <Button>p-reset</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Need valid id card  to confirm salary" onCopy={handleCopy}>
                <Button>ID</Button>
              </CopyToClipboard>
              <CopyToClipboard text="Need valid pay slips to confirm salary" onCopy={handleCopy}>
                <Button>PaySlip</Button>
              </CopyToClipboard>
            </div>
            
            <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className={`${glassmorphismStyle} p-4`}>
              <Transaction />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`${glassmorphismStyle} p-4`}>
                <AutoSalaryCalculator />
              </div>
              <div className={`${glassmorphismStyle} p-4`}>
                <CompanySearch />
              </div>
            </div>
 
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <div className={`${glassmorphismStyle} p-4`}>
              <TextCleanerTool />
            </div>
            </div>
             
          </div>
        </div>
      </div>

      

<Footer className="mt-auto" />
      
      {showAdPopup && <AdPopup onClose={() => setShowAdPopup(false)} />}
      
      {showNotification && (
        <NotificationPopup 
          message={notificationMessage} 
          onClose={() => setShowNotification(false)} 
        />
      )}
      
      {children}
    </div>
  );
};

export default Layout;