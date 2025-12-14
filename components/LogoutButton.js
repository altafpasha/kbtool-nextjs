import { useRouter } from 'next/router';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

const LogoutButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await fetch('/api/auth?action=logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            title="Logout"
        >
            <LogOut className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
    );
};

export default LogoutButton;
