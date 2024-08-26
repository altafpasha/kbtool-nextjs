import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AutoSalaryCalculator from './AutoSalaryCalculator';
import CompanySearch from './CompanySearch';
import Footer from './Footer';
import Button from './Button';
import ResetButton from './ResetButton';
import Card from './Card';
import ZaubaButton from './ZaubaButton';
import ButtonPro from './ButtonPro';
import SocialMediaCard from '../components/SocialMediaCard';



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

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('customComments')) || [];
    setCustomComments(storedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('customComments', JSON.stringify(customComments));
  }, [customComments]);

  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

   const copyResult = () => {
    const idsArray = ids.trim().split(" ");
    const idsCount = idsArray.length;
    const idsOutput = idsArray.join(",");
    
    let result = "";
    if (idsCount > 0) {
      if (loanId) {
        result = `${loanId}:${idsCount}:${idsOutput}`;
      } else {
        result = `${idsCount}:${idsOutput}`;
      }
    }

    setOutput(result);
    
    // Copy to clipboard
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    // Increment reset counter
    setResetCounter(prev => prev + 1);

    // Reset fields after 5 seconds
    setTimeout(resetFields, 5000);
  };

  const resetFields = () => {
    setLoanId('');
    setIds('');
    setOutput('Result will be displayed here');
  };

  const checkEnter = (event) => {
    if (event.keyCode === 13) {
      copyResult();
    }
  };

  const addCustomComment = () => {
    if (newCommentTitle && newCommentContent) {
      const newComments = [...customComments, { title: newCommentTitle, content: newCommentContent }];
      setCustomComments(newComments);
      setNewCommentTitle('');
      setNewCommentContent('');
    }
  };

  const handleDeleteComment = () => {
    if (selectedCommentIndex !== null) {
      const newComments = customComments.filter((_, index) => index !== selectedCommentIndex);
      setCustomComments(newComments);
      setSelectedCommentIndex(null);
    }
  };

  const glassmorphismStyle = `
  bg-gradient-to-br from-black/70 to-gray-900/70
  backdrop-blur-3xl
  border-4 border-gray-600/50
  shadow-3xl
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

  const inputStyle2 = `
    bg-transparent
    border border-white/20
    text-white
    placeholder-white/50
    rounded-lg
    p-2
    w-40
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500
    transition
  `;



  return (
    
    <div className="min-h-screen dark:bg-white bg-black dark:bg-dot-black/[0.2] bg-dot-white/[0.2]  relative flex flex-col">
      
      <div className="flex flex-col lg:flex-row flex-grow p-4 gap-4">
        
        <div className={`w-full lg:w-1/4 ${glassmorphismStyle} p-4`}>
        <span className="absolute inset-0 rounded-lg bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(128,90,213,0.6)_0%,rgba(128,90,213,0)_75%)] opacity-50" />
        
          {/* Tabs and buttons */}
          <div className="flex justify-around p-2 mb-4 bg-white/10 rounded-full">
            <ZaubaButton onClick={() => showTab('approved')} className={`text-xs sm:text-sm ${activeTab === 'approved' ? 'bg-purple-500' : ''}`}>Approved</ZaubaButton>
            <ZaubaButton onClick={() => showTab('reject')} className={`text-xs sm:text-sm ${activeTab === 'reject' ? 'bg-purple-500' : ''}`}>Reject</ZaubaButton>
            <ZaubaButton onClick={() => showTab('comments')} className={`text-xs sm:text-sm ${activeTab === 'comments' ? 'bg-purple-500' : ''}`}>Comments</ZaubaButton>
          </div>

          {/* Content for each tab */}
          <div className={`flex-wrap text-medium gap-2 ${activeTab === 'approved' ? 'flex' : 'hidden'}`}>
            {/* Approved buttons (unchanged) */}
            <h5 className="font-bold text-white w-full">QID_109</h5>
              <CopyToClipboard text="salary_slip" onCopy={handleCopy}>
                <Button className="gap-2 " >salary_slip</Button>
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
              {/* Add more buttons as needed */}

          </div>
          <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
          <div className={`flex-wrap gap-2 ${activeTab === 'reject' ? 'flex' : 'hidden'}`}>
            {/* Reject buttons (unchanged) */}
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
              {/* Add more buttons as needed */}
            
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
        </div>

        <div className="w-full lg:w-3/4">
        
          <div className={`${glassmorphismStyle} p-4 mb-4`}>
            
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="QID 106 and 117"
                onKeyUp={checkEnter}
                className={inputStyle2}
              />
              <input
                type="text"
                value={ids}
                onChange={(e) => setIds(e.target.value)}
                placeholder="Enter transactions_id"
                onKeyUp={checkEnter}
                className={inputStyle}
              />

              <div className="flex flex-wrap gap-2">
                <Button onClick={copyResult} className="text-xs sm:text-sm">
                  <i className="fas fa-copy"></i> Copy
                </Button>
                <ResetButton onClick={resetFields} className="text-xs sm:text-sm">
                  <i className="fas fa-redo"></i> Reset <span>{resetCounter}</span>
                </ResetButton>
                <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
              </div>
            </div>
            <div id="output" className={`${inputStyle} min-h-[50px]`}>
              {output}
            </div>
            
          </div>
          

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className={`w-full lg:w-1/2 ${glassmorphismStyle} p-4`}>
              <AutoSalaryCalculator />
            </div>
            <div className={`w-full lg:w-1/2 ${glassmorphismStyle} p-4`}>
              <CompanySearch />
            </div>
          </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">    
          <div className={`w-full lg:w-1/2  ${glassmorphismStyle} p-4`}>
            <h5 className="font-bold mb-2 text-white text-sm sm:text-base">Add/Delete Custom Comments Button</h5>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newCommentTitle}
                onChange={(e) => setNewCommentTitle(e.target.value)}
                placeholder="Button Title"
                className={inputStyle}
              />
              <textarea
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                placeholder="Comment Content"
                className={`${inputStyle} min-h-[100px]`}
              />
              <div className="flex flex-wrap gap-2">
                <ZaubaButton onClick={addCustomComment}>Add Comment Button</ZaubaButton>
                <select
                  value={selectedCommentIndex ?? ''}
                  onChange={(e) => setSelectedCommentIndex(Number(e.target.value))}
                  className={`${inputStyle} flex-grow `}
                >
                  <option className=" bg-black" value="">Select a comment to delete</option>
                  {customComments.map((comment, index) => (
                    <option className=" bg-black" key={index} value={index}>
                      {comment.title}
                    </option>
                  ))}
                </select>
                <ZaubaButton onClick={handleDeleteComment} className="text-xs sm:text-sm">Delete Comment</ZaubaButton>
                <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
              </div>
            </div>
            
          </div>
          <div className={`w-full lg:w-1/2 ${glassmorphismStyle} p-4`}>
              <SocialMediaCard />
            </div>
          </div>  
        </div>
        
      </div>
      

      {copied && (
        <div className="fixed bottom-24 left-4 bg-purple-600 text-white py-2 px-4 rounded text-sm">
          Copied to clipboard!
        </div>
      )}

      
      <Footer />
      
      {children}
    </div>
  );
};

export default Layout;