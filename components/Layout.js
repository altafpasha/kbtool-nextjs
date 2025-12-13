import React, { useState, useEffect } from 'react';
import { Check, Plus, X, MessageSquare } from "lucide-react";
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
    setShowAdPopup(true); setShowAdPopup(true);

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
        w-full h-auto min-h-[48px] py-3 px-4 relative overflow-hidden
        transition-all duration-300 font-medium rounded-xl
        ${getButtonStyle(type)}
        ${copiedButton === text ? 'bg-white/20 border-white/30 text-white scale-95' : ''}
      `}
    >
      {copiedButton === text ? (
        <div className="flex items-center justify-center gap-2">
          <Check className="h-4 w-4" />
          <span>Copied!</span>
        </div>
      ) : (
        <span className="font-medium text-sm">{label || text}</span>
      )}
    </Button>
  );

  const ButtonGroup = ({ title, buttons, type }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-white/80 text-xs uppercase tracking-wider pl-1">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
    <div className="h-screen dark-bg flex flex-col overflow-hidden">
      <div className="flex-1 p-3 md:p-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">

          {/* Quick Actions Card */}
          <Card className="p-5 glass-card border-0">
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-semibold">Common Comments</h3>
            <Tabs defaultValue="approved" className="w-full">
              <TabsList className="w-full mb-5 bg-black/40 rounded-full p-1 flex">
                <TabsTrigger
                  value="approved"
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2.5 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md text-white/50 hover:text-white/70"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approved
                </TabsTrigger>
                <TabsTrigger
                  value="reject"
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2.5 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-md text-white/50 hover:text-white/70"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-full py-2.5 px-3 text-xs font-medium transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md text-white/50 hover:text-white/70"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
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
            <Card className="p-5 glass-card border-0">
              <Transaction />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-5 glass-card border-0">
                <AutoSalaryCalculator />
              </Card>
              <Card className="p-5 glass-card border-0">
                <CompanySearch />
              </Card>
            </div>


          </div>
        </div>
      </div>

      <Footer />

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