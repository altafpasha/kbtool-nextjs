import React, { useState, useEffect } from 'react';
import { Check, Plus } from "lucide-react";
import Transaction from './Transaction';
import AutoSalaryCalculator from './AutoSalaryCalculator';
import CompanySearch from './CompanySearch';
import TextCleanerTool from './TextCleanerTool';
import Footer from '../components/Footer';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdPopup from "../components/AdPopup"
import NotificationPopup from './NotificationPopup';




const Layout = ({ children }) => {
  const [copiedButton, setCopiedButton] = useState(null);
  const [customButtons, setCustomButtons] = useState([]);
  const [newButtonTitle, setNewButtonTitle] = useState('');
  const [newButtonContent, setNewButtonContent] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const savedButtons = localStorage.getItem('customButtons');
    if (savedButtons) {
      setCustomButtons(JSON.parse(savedButtons));
    }
  }, []);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedButton(text);
    setTimeout(() => setCopiedButton(null), 2000);
  };

  const handleAddCustomButton = () => {
    if (newButtonTitle && newButtonContent) {
      const newButton = {
        title: newButtonTitle,
        content: newButtonContent
      };
      const updatedButtons = [...customButtons, newButton];
      setCustomButtons(updatedButtons);
      localStorage.setItem('customButtons', JSON.stringify(updatedButtons));
      setNewButtonTitle('');
      setNewButtonContent('');
      setShowCustomForm(false);
    }
  };

  useEffect(() => {
    // ... existing useEffect code
    
    // Show ad popup on page load/refresh
    setShowAdPopup(true);    setShowAdPopup(true);

    // Show a notification after a short delay
    const timer = setTimeout(() => {
      setNotificationMessage('Welcome to our tool! Hope you find it useful.');
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  
  const getButtonStyle = (type) => {
    const styles = {
      approved: `
        bg-green-500/20 backdrop-blur-lg
        border border-green-500/30
        hover:bg-green-500/30 hover:border-green-500/40
        text-green-100
      `,
      reject: `
        bg-red-500/20 backdrop-blur-lg
        border border-red-500/30
        hover:bg-red-500/30 hover:border-red-500/40
        text-red-100
      `,
      comment: `
        bg-blue-500/20 backdrop-blur-lg
        border border-blue-500/30
        hover:bg-blue-500/30 hover:border-blue-500/40
        text-blue-100
      `,
      custom: `
        bg-amber-500/20 backdrop-blur-lg
        border border-amber-500/30
        hover:bg-amber-500/30 hover:border-amber-500/40
        text-amber-100
      `
    };
    return styles[type] || styles.comment;
  };

  const CopyButton = ({ text, label, type = 'comment' }) => (
    <Button
      variant="secondary"
      onClick={() => handleCopyText(text)}
      className={`
        w-full h-12 relative overflow-hidden
        transition-all duration-300 font-medium
        ${getButtonStyle(type)}
        ${copiedButton === text ? 'bg-gray-500/30 border-gray-500/50 text-purple-100' : ''}
      `}
    >
      {copiedButton === text ? (
        <div className="flex items-center justify-center gap-2">
          <Check className="h-4 w-4" />
          <span>Copied!</span>
        </div>
      ) : (
        <span className="font-medium">{label || text}</span>
      )}
    </Button>
  );

  const ButtonGroup = ({ title, buttons, type }) => (
    <div className="space-y-3">
      <h3 className="font-bold text-white/90 text-sm pl-1">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {buttons.map((button, index) => (
          <CopyButton key={index} text={button.text} label={button.label} type={type} />
        ))}
      </div>
    </div>
  );



  const approvedButtons = [
    {
      title: "QID_109",
      buttons: [
        { text: "salary_slip", label: "salary_slip" },
        { text: "bank_narration", label: "bank_narration" },
        { text: "company_id", label: "company_id" }
      ]
    },
    {
      title: "QID_101",
      buttons: [
        { text: "not found", label: "not found" }
      ]
    },
    {
      title: "QID_061",
      buttons: [
        { text: "Approved", label: "Approved" }
      ]
    },
    {
      title: "QID_102",
      buttons: [
        { text: "KYC documents are proper", label: "KYC" },
        { text: "selfie", label: "selfie" },
        { text: "pan", label: "pan" },
        { text: "aadhaar", label: "aadhaar" }
      ]
    }
  ];

  const rejectButtons = [
    {
      title: "QID_108",
      buttons: [
        { text: "NOT APPROVED", label: "NOT APPROVED" }
      ]
    },
    {
      title: "QID_109",
      buttons: [
        { text: "NOT MATCH", label: "NOT MATCH" }
      ]
    },
    {
      title: "QID_101",
      buttons: [
        { text: "not found", label: "not found" }
      ]
    },
    {
      title: "QID_061",
      buttons: [
        { text: "Salary Mode is cash", label: "cash" },
        { text: "Salary Mode is Cheque", label: "Cheque" },
        { text: "Govt Employee", label: "Govt Employee" },
        { text: "Self Employed", label: "Self Employed" },
        { text: "Not a Salaried Employee", label: "NOT-Sal" },
        { text: "Salary Irregular", label: "Salary Irregular" }
      ]
    },
    {
      title: "QID_102",
      buttons: [
        { text: "KYC documents are proper", label: "KYC" },
        { text: "selfie", label: "selfie" },
        { text: "pan", label: "pan" },
        { text: "aadhaar", label: "aadhaar" }
      ]
    }
  ];

  const commentButtons = [
    {
      title: "Common Comments",
      buttons: [
        { text: "QID75-Latest 3-months statement not available, Need Recent 3/6 Months Bank Acc statement Hence Given Preset", label: "QID-75" },
        { text: "Need valid id card or pay slips to confirm salary", label: "id-payslip" },
        { text: "Need till date bank statement -- Hence given p-reset", label: "p-reset" },
        { text: "Need valid id card to confirm salary", label: "ID" },
        { text: "Need valid pay slips to confirm salary", label: "PaySlip" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative flex flex-col">
      <div className="flex-grow p-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
          {/* Quick Actions Card */}
          <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-white/10 shadow-lg">
            <Tabs defaultValue="approved" className="w-full">
              <TabsList className="w-full mb-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-1">
                <TabsTrigger 
                  value="approved" 
                  className="flex-1 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-100 text-white/70"
                >
                  Approved
                </TabsTrigger>
                <TabsTrigger 
                  value="reject" 
                  className="flex-1 data-[state=active]:bg-red-500/20 data-[state=active]:text-red-100 text-white/70"
                >
                  Reject
                </TabsTrigger>
                <TabsTrigger 
                  value="comments" 
                  className="flex-1 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-100 text-white/70"
                >
                  Comments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="approved" className="space-y-6 mt-2">
                {approvedButtons.map((group, index) => (
                  <ButtonGroup key={index} {...group} type="approved" />
                ))}
              </TabsContent>

              <TabsContent value="reject" className="space-y-6 mt-2">
                {rejectButtons.map((group, index) => (
                  <ButtonGroup key={index} {...group} type="reject" />
                ))}
              </TabsContent>

              <TabsContent value="comments" className="space-y-6 mt-2">
                {commentButtons.map((group, index) => (
                  <ButtonGroup key={index} {...group} type="comment" />
                ))}

                {customButtons.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-white/90 text-sm pl-1">Custom Buttons</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {customButtons.map((button, index) => (
                        <CopyButton 
                          key={index}
                          text={button.content}
                          label={button.title}
                          type="custom"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  {!showCustomForm ? (
                    <Button
                      onClick={() => setShowCustomForm(true)}
                      className="w-full bg-amber-500/20 backdrop-blur-lg border border-amber-500/30 
                               hover:bg-amber-500/30 hover:border-amber-500/40 text-amber-100"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Button
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        placeholder="Button Title"
                        value={newButtonTitle}
                        onChange={(e) => setNewButtonTitle(e.target.value)}
                        maxLength={10}
                        className="bg-white/5 border-white/20 text-white"
                      />
                      <Textarea
                        placeholder="Button Content"
                        value={newButtonContent}
                        onChange={(e) => setNewButtonContent(e.target.value)}
                        className="h-24 bg-white/5 border-white/20 text-white"
                      />
                      <div className="flex gap-3">
                        <Button
                          onClick={handleAddCustomButton}
                          className="flex-1 bg-amber-500/20 backdrop-blur-lg border border-amber-500/30 
                                   hover:bg-amber-500/30 hover:border-amber-500/40 text-amber-100"
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setShowCustomForm(false);
                            setNewButtonTitle('');
                            setNewButtonContent('');
                          }}
                          className="flex-1 bg-black/30 backdrop-blur-lg text-white border border-white/10 hover:bg-black/50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
                
          {/* Right Column */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-white/10 shadow-lg">
              <Transaction />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-white/10 shadow-lg">
                <AutoSalaryCalculator />
              </Card>
              <Card className="p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border-white/10 shadow-lg">
                <CompanySearch />
                
              </Card>
            </div>

            
          </div>
        </div>
      </div>
      
      <Footer className="mt-auto" />

      {showAdPopup && <AdPopup onClose={() => setShowAdPopup(false)} />}      {showAdPopup && <AdPopup onClose={() => setShowAdPopup(false)} />}
      
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