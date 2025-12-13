import React, { useState, useEffect } from 'react';
import { Shield, Power, Eye, EyeOff, Check, X, Settings } from 'lucide-react';
import { useRouter } from 'next/router';

const AdminPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Check current maintenance status
    useEffect(() => {
        fetch('/api/maintenance')
            .then(res => res.json())
            .then(data => setMaintenanceMode(data.maintenanceMode))
            .catch(() => { });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/maintenance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, action: 'toggle' })
            });

            const data = await res.json();

            if (res.ok) {
                setIsAuthenticated(true);
                // Revert the toggle since we just wanted to verify password
                await fetch('/api/maintenance', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password, action: 'toggle' })
                });
                // Get actual status
                const statusRes = await fetch('/api/maintenance');
                const statusData = await statusRes.json();
                setMaintenanceMode(statusData.maintenanceMode);
            } else {
                setError(data.error || 'Authentication failed');
            }
        } catch {
            setError('Failed to connect');
        }
        setLoading(false);
    };

    const toggleMaintenance = async () => {
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/maintenance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, action: 'toggle' })
            });

            const data = await res.json();

            if (res.ok) {
                setMaintenanceMode(data.maintenanceMode);
                setMessage(`Maintenance mode ${data.maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
            }
        } catch {
            setError('Failed to toggle');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen dark-bg flex items-center justify-center p-4">
            <div className="glass-card p-8 max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                        <p className="text-xs text-white/40">KBTool Maintenance Control</p>
                    </div>
                </div>

                {!isAuthenticated ? (
                    /* Login Form */
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-sm text-white/60 mb-2 block">Admin Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="glass-input w-full pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                <X className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full glass-btn glass-btn-success py-3 flex items-center justify-center gap-2"
                        >
                            <Shield className="w-4 h-4" />
                            {loading ? 'Authenticating...' : 'Login as Admin'}
                        </button>
                    </form>
                ) : (
                    /* Admin Controls */
                    <div className="space-y-6">
                        {/* Status */}
                        <div className={`p-4 rounded-xl border ${maintenanceMode ? 'bg-red-500/10 border-red-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white/60">Current Status</p>
                                    <p className={`text-lg font-bold ${maintenanceMode ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {maintenanceMode ? '🔴 MAINTENANCE ON' : '🟢 LIVE'}
                                    </p>
                                </div>
                                <div className={`w-4 h-4 rounded-full ${maintenanceMode ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                            </div>
                        </div>

                        {/* Toggle Button */}
                        <button
                            onClick={toggleMaintenance}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 transition-all ${maintenanceMode
                                    ? 'bg-emerald-500 hover:bg-emerald-600'
                                    : 'bg-red-500 hover:bg-red-600'
                                }`}
                        >
                            <Power className="w-5 h-5" />
                            {loading ? 'Processing...' : maintenanceMode ? 'Turn OFF Maintenance' : 'Turn ON Maintenance'}
                        </button>

                        {message && (
                            <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-lg">
                                <Check className="w-4 h-4" />
                                {message}
                            </div>
                        )}

                        {/* Info */}
                        <div className="text-center text-white/30 text-xs space-y-1">
                            <p>When maintenance is ON, users will see</p>
                            <p>&quot;We&apos;ll be back soon&quot; page</p>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={() => {
                                setIsAuthenticated(false);
                                setPassword('');
                            }}
                            className="w-full text-white/40 hover:text-white text-sm py-2"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
