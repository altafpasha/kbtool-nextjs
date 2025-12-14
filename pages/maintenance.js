import React, { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Home, Heart } from 'lucide-react';
import { useRouter } from 'next/router';

const MaintenancePage = () => {
    const router = useRouter();
    const [checking, setChecking] = useState(false);

    // Poll to check if maintenance is turned off
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch('/api/maintenance');
                const data = await res.json();
                if (!data.maintenanceMode) {
                    // Maintenance is OFF - redirect to home
                    router.push('/');
                }
            } catch { }
        };

        // Check immediately
        checkStatus();

        // Poll every 3 seconds
        const interval = setInterval(checkStatus, 3000);

        return () => clearInterval(interval);
    }, [router]);

    const handleRetry = async () => {
        setChecking(true);
        try {
            const res = await fetch('/api/maintenance');
            const data = await res.json();
            if (!data.maintenanceMode) {
                router.push('/');
            } else {
                setTimeout(() => setChecking(false), 1000);
            }
        } catch {
            setTimeout(() => setChecking(false), 1000);
        }
    };

    return (
        <div className="min-h-screen dark-bg flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            {/* Main content */}
            <div className="glass-card p-8 md:p-12 max-w-md w-full text-center relative z-10">

                {/* Error icon */}
                <div className="relative mb-8">
                    <div className="w-28 h-28 mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full animate-pulse" />
                        <div className="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-12 h-12 text-red-400" />
                        </div>
                    </div>
                </div>

                {/* Error code */}
                <div className="text-6xl md:text-7xl font-black text-white/10 mb-2">503</div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Service Unavailable
                </h1>

                {/* Description */}
                <p className="text-white/50 text-base mb-8 leading-relaxed">
                    We&apos;re experiencing some technical difficulties. Our team is working to restore service as quickly as possible.
                </p>

                {/* Action buttons */}
                <div className="space-y-3 mb-8">
                    <button
                        onClick={handleRetry}
                        disabled={checking}
                        className="w-full glass-btn glass-btn-success py-3 flex items-center justify-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
                        {checking ? 'Checking...' : 'Try Again'}
                    </button>

                    <a
                        href="https://codesec.me"
                        className="w-full glass-btn py-3 flex items-center justify-center gap-2 text-white/60 hover:text-white"
                    >
                        <Home className="w-4 h-4" />
                        Visit CodeSec
                    </a>
                </div>

                {/* Status indicator */}
                <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 text-sm font-medium">Server Status: Offline</span>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-white/30 text-xs">
                    <span>Made with</span>
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>by</span>
                    <span className="text-white/50">Altaf</span>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
