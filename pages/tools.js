import React, { useState } from 'react';
import { Calculator, Percent, Calendar, ArrowLeft, Copy, Check, DollarSign, CreditCard, TrendingUp, PiggyBank, Receipt } from 'lucide-react';
import Link from 'next/link';
import Footer from '../components/Footer';

// ToolCard component OUTSIDE the main component to prevent re-rendering
const ToolCard = ({ title, icon: Icon, children }) => (
    <div className="glass-card p-4 space-y-3">
        <div className="flex items-center gap-2 text-white/80">
            <Icon className="w-4 h-4" />
            <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        {children}
    </div>
);

const Tools = () => {
    const [copied, setCopied] = useState(null);

    // Calculator State
    const [calcDisplay, setCalcDisplay] = useState('0');
    const [calcPrevious, setCalcPrevious] = useState(null);
    const [calcOperator, setCalcOperator] = useState(null);

    // Percentage Calculator
    const [percentValue, setPercentValue] = useState('');
    const [percentOf, setPercentOf] = useState('');
    const [percentResult, setPercentResult] = useState('');

    // Age Calculator
    const [birthDate, setBirthDate] = useState('');
    const [ageResult, setAgeResult] = useState('');

    // EMI Calculator
    const [emiPrincipal, setEmiPrincipal] = useState('');
    const [emiRate, setEmiRate] = useState('');
    const [emiTenure, setEmiTenure] = useState('');
    const [emiResult, setEmiResult] = useState(null);

    // Simple Interest Calculator
    const [siPrincipal, setSiPrincipal] = useState('');
    const [siRate, setSiRate] = useState('');
    const [siTime, setSiTime] = useState('');
    const [siResult, setSiResult] = useState(null);

    // Compound Interest Calculator
    const [ciPrincipal, setCiPrincipal] = useState('');
    const [ciRate, setCiRate] = useState('');
    const [ciTime, setCiTime] = useState('');
    const [ciFreq, setCiFreq] = useState('12');
    const [ciResult, setCiResult] = useState(null);

    // Loan Eligibility Calculator
    const [leSalary, setLeSalary] = useState('');
    const [leExisting, setLeExisting] = useState('');
    const [leResult, setLeResult] = useState(null);

    // GST Calculator
    const [gstAmount, setGstAmount] = useState('');
    const [gstRate, setGstRate] = useState('18');
    const [gstResult, setGstResult] = useState(null);

    // Calculator Functions
    const calcInput = (num) => {
        setCalcDisplay(prev => prev === '0' ? num : prev + num);
    };

    const calcOperate = (op) => {
        setCalcPrevious(parseFloat(calcDisplay));
        setCalcOperator(op);
        setCalcDisplay('0');
    };

    const calcEquals = () => {
        if (calcPrevious === null || calcOperator === null) return;
        const current = parseFloat(calcDisplay);
        let result;
        switch (calcOperator) {
            case '+': result = calcPrevious + current; break;
            case '-': result = calcPrevious - current; break;
            case '×': result = calcPrevious * current; break;
            case '÷': result = calcPrevious / current; break;
            default: return;
        }
        setCalcDisplay(String(result));
        setCalcPrevious(null);
        setCalcOperator(null);
    };

    const calcClear = () => {
        setCalcDisplay('0');
        setCalcPrevious(null);
        setCalcOperator(null);
    };

    // Percentage Calculator
    const calcPercent = () => {
        if (percentValue && percentOf) {
            const result = (parseFloat(percentValue) / 100) * parseFloat(percentOf);
            setPercentResult(result.toFixed(2));
        }
    };

    // Age Calculator
    const calcAge = () => {
        if (!birthDate) return;
        const birth = new Date(birthDate);
        const today = new Date();
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();
        if (days < 0) { months--; days += 30; }
        if (months < 0) { years--; months += 12; }
        setAgeResult(`${years} years, ${months} months, ${days} days`);
    };

    // EMI Calculator
    const calcEMI = () => {
        if (!emiPrincipal || !emiRate || !emiTenure) return;
        const P = parseFloat(emiPrincipal);
        const r = parseFloat(emiRate) / 12 / 100;
        const n = parseFloat(emiTenure);
        const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        const totalAmount = emi * n;
        const totalInterest = totalAmount - P;
        setEmiResult({
            emi: emi.toFixed(0),
            total: totalAmount.toFixed(0),
            interest: totalInterest.toFixed(0)
        });
    };

    // Simple Interest Calculator
    const calcSI = () => {
        if (!siPrincipal || !siRate || !siTime) return;
        const P = parseFloat(siPrincipal);
        const R = parseFloat(siRate);
        const T = parseFloat(siTime);
        const interest = (P * R * T) / 100;
        const total = P + interest;
        setSiResult({ interest: interest.toFixed(2), total: total.toFixed(2) });
    };

    // Compound Interest Calculator  
    const calcCI = () => {
        if (!ciPrincipal || !ciRate || !ciTime) return;
        const P = parseFloat(ciPrincipal);
        const R = parseFloat(ciRate) / 100;
        const T = parseFloat(ciTime);
        const n = parseFloat(ciFreq);
        const amount = P * Math.pow((1 + R / n), n * T);
        const interest = amount - P;
        setCiResult({ interest: interest.toFixed(2), total: amount.toFixed(2) });
    };

    // Loan Eligibility (FOIR based - 50% of income)
    const calcLoanEligibility = () => {
        if (!leSalary) return;
        const salary = parseFloat(leSalary);
        const existing = parseFloat(leExisting) || 0;
        const maxEmi = (salary * 0.5) - existing; // 50% FOIR
        const eligibleAmount = maxEmi * 60; // Assuming 5 year tenure
        setLeResult({
            maxEmi: maxEmi.toFixed(0),
            eligible: eligibleAmount > 0 ? eligibleAmount.toFixed(0) : '0'
        });
    };

    // GST Calculator
    const calcGST = () => {
        if (!gstAmount) return;
        const amount = parseFloat(gstAmount);
        const rate = parseFloat(gstRate);
        const gst = (amount * rate) / 100;
        const total = amount + gst;
        setGstResult({ gst: gst.toFixed(2), total: total.toFixed(2) });
    };

    const copyToClipboard = async (text, id) => {
        await navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="h-screen dark-bg flex flex-col overflow-hidden">
            <div className="flex-1 p-3 md:p-4 overflow-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <Link href="/">
                        <span className="glass-btn p-2 cursor-pointer">
                            <ArrowLeft className="w-4 h-4" />
                        </span>
                    </Link>
                    <h1 className="text-xl font-bold text-white">Productivity Tools</h1>
                </div>

                {/* NBFC Tools Section */}
                <h2 className="text-xs uppercase tracking-widest text-emerald-400/70 mb-3 font-semibold">NBFC / Financial Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    {/* EMI Calculator */}
                    <ToolCard title="EMI Calculator" icon={CreditCard}>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={emiPrincipal}
                            onChange={(e) => setEmiPrincipal(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Loan Amount"
                            className="glass-input w-full text-sm"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={emiRate}
                                onChange={(e) => setEmiRate(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="Interest %"
                                className="glass-input flex-1 text-sm"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                value={emiTenure}
                                onChange={(e) => setEmiTenure(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="Months"
                                className="glass-input flex-1 text-sm"
                            />
                        </div>
                        <button onClick={calcEMI} className="w-full glass-btn glass-btn-success text-sm">Calculate EMI</button>
                        {emiResult && (
                            <div className="bg-black/30 rounded-lg p-3 space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-white/50">Monthly EMI:</span><span className="text-emerald-400 font-semibold">₹{parseInt(emiResult.emi).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Total Interest:</span><span className="text-red-400">₹{parseInt(emiResult.interest).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Total Amount:</span><span className="text-blue-400">₹{parseInt(emiResult.total).toLocaleString()}</span></div>
                            </div>
                        )}
                    </ToolCard>

                    {/* Simple Interest */}
                    <ToolCard title="Simple Interest" icon={TrendingUp}>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={siPrincipal}
                            onChange={(e) => setSiPrincipal(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Principal Amount"
                            className="glass-input w-full text-sm"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={siRate}
                                onChange={(e) => setSiRate(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="Rate %"
                                className="glass-input flex-1 text-sm"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                value={siTime}
                                onChange={(e) => setSiTime(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="Years"
                                className="glass-input flex-1 text-sm"
                            />
                        </div>
                        <button onClick={calcSI} className="w-full glass-btn glass-btn-info text-sm">Calculate SI</button>
                        {siResult && (
                            <div className="bg-black/30 rounded-lg p-3 space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-white/50">Interest:</span><span className="text-emerald-400">₹{parseFloat(siResult.interest).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Total:</span><span className="text-blue-400">₹{parseFloat(siResult.total).toLocaleString()}</span></div>
                            </div>
                        )}
                    </ToolCard>

                    {/* Compound Interest */}
                    <ToolCard title="Compound Interest" icon={PiggyBank}>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={ciPrincipal}
                            onChange={(e) => setCiPrincipal(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Principal Amount"
                            className="glass-input w-full text-sm"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={ciRate}
                                onChange={(e) => setCiRate(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="Rate %"
                                className="glass-input flex-1 text-sm"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                value={ciTime}
                                onChange={(e) => setCiTime(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="Years"
                                className="glass-input flex-1 text-sm"
                            />
                        </div>
                        <select value={ciFreq} onChange={(e) => setCiFreq(e.target.value)} className="glass-input w-full text-sm">
                            <option value="1">Yearly</option>
                            <option value="4">Quarterly</option>
                            <option value="12">Monthly</option>
                        </select>
                        <button onClick={calcCI} className="w-full glass-btn glass-btn-success text-sm">Calculate CI</button>
                        {ciResult && (
                            <div className="bg-black/30 rounded-lg p-3 space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-white/50">Interest:</span><span className="text-emerald-400">₹{parseFloat(ciResult.interest).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Total:</span><span className="text-blue-400">₹{parseFloat(ciResult.total).toLocaleString()}</span></div>
                            </div>
                        )}
                    </ToolCard>

                    {/* Loan Eligibility */}
                    <ToolCard title="Loan Eligibility (FOIR)" icon={DollarSign}>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={leSalary}
                            onChange={(e) => setLeSalary(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Monthly Salary"
                            className="glass-input w-full text-sm"
                        />
                        <input
                            type="text"
                            inputMode="numeric"
                            value={leExisting}
                            onChange={(e) => setLeExisting(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Existing EMI (optional)"
                            className="glass-input w-full text-sm"
                        />
                        <button onClick={calcLoanEligibility} className="w-full glass-btn glass-btn-info text-sm">Check Eligibility</button>
                        {leResult && (
                            <div className="bg-black/30 rounded-lg p-3 space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-white/50">Max EMI:</span><span className="text-emerald-400">₹{parseInt(leResult.maxEmi).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Eligible (5yr):</span><span className="text-blue-400">₹{parseInt(leResult.eligible).toLocaleString()}</span></div>
                            </div>
                        )}
                    </ToolCard>

                </div>

                {/* General Tools Section */}
                <h2 className="text-xs uppercase tracking-widest text-blue-400/70 mb-3 font-semibold">General Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* GST Calculator */}
                    <ToolCard title="GST Calculator" icon={Receipt}>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={gstAmount}
                            onChange={(e) => setGstAmount(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Amount (excl. GST)"
                            className="glass-input w-full text-sm"
                        />
                        <select value={gstRate} onChange={(e) => setGstRate(e.target.value)} className="glass-input w-full text-sm">
                            <option value="5">5% GST</option>
                            <option value="12">12% GST</option>
                            <option value="18">18% GST</option>
                            <option value="28">28% GST</option>
                        </select>
                        <button onClick={calcGST} className="w-full glass-btn glass-btn-success text-sm">Calculate GST</button>
                        {gstResult && (
                            <div className="bg-black/30 rounded-lg p-3 space-y-1 text-sm">
                                <div className="flex justify-between"><span className="text-white/50">GST Amount:</span><span className="text-emerald-400">₹{parseFloat(gstResult.gst).toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-white/50">Total:</span><span className="text-blue-400">₹{parseFloat(gstResult.total).toLocaleString()}</span></div>
                            </div>
                        )}
                    </ToolCard>

                    {/* Calculator */}
                    <ToolCard title="Calculator" icon={Calculator}>
                        <div className="bg-black/30 rounded-lg p-3 text-right text-2xl text-white font-mono">
                            {calcDisplay}
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => btn === '=' ? calcEquals() : ['+', '-', '×', '÷'].includes(btn) ? calcOperate(btn) : calcInput(btn)}
                                    className={`p-3 rounded-lg font-semibold transition-all ${['+', '-', '×', '÷'].includes(btn) ? 'bg-blue-500/20 text-blue-400' :
                                        btn === '=' ? 'bg-emerald-500/20 text-emerald-400' :
                                            'bg-white/5 text-white hover:bg-white/10'
                                        }`}
                                >
                                    {btn}
                                </button>
                            ))}
                            <button onClick={calcClear} className="col-span-4 p-2 rounded-lg bg-red-500/20 text-red-400 text-sm">
                                Clear
                            </button>
                        </div>
                    </ToolCard>

                    {/* Percentage Calculator */}
                    <ToolCard title="Percentage Calculator" icon={Percent}>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={percentValue}
                                onChange={(e) => setPercentValue(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="%"
                                className="glass-input flex-1 text-sm"
                            />
                            <span className="text-white/50 text-sm">% of</span>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={percentOf}
                                onChange={(e) => setPercentOf(e.target.value.replace(/[^0-9.]/g, ''))}
                                placeholder="Value"
                                className="glass-input flex-1 text-sm"
                            />
                        </div>
                        <button onClick={calcPercent} className="w-full glass-btn glass-btn-success text-sm">Calculate</button>
                        {percentResult && (
                            <div className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                                <span className="text-emerald-400 font-semibold">{percentResult}</span>
                                <button onClick={() => copyToClipboard(percentResult, 'percent')} className="text-white/50 hover:text-white">
                                    {copied === 'percent' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        )}
                    </ToolCard>

                    {/* Age Calculator */}
                    <ToolCard title="Age Calculator" icon={Calendar}>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="glass-input w-full text-sm"
                        />
                        <button onClick={calcAge} className="w-full glass-btn glass-btn-info text-sm">Calculate Age</button>
                        {ageResult && (
                            <div className="bg-black/30 rounded-lg p-3 text-center text-blue-400 font-semibold text-sm">
                                {ageResult}
                            </div>
                        )}
                    </ToolCard>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Tools;
