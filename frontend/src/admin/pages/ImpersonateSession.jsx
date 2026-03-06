import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import storage from '../../utils/storage';

const ImpersonateSession = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');

    if (token && userData) {
      try {
        // We use storage.set with isSession=true so this login is ONLY for this specific tab
        storage.set('authToken', token, true);
        storage.set('userData', userData, true);

        // Also set userRole from the parsed userData
        const parsedUser = JSON.parse(decodeURIComponent(userData));
        storage.set('userRole', parsedUser.role, true);

        // Redirect to admin dashboard in this new tab
        navigate('/admin');
      } catch (error) {
        console.error("Impersonation setup failed:", error);
        document.body.innerHTML = "Impersonation setup failed. Please close this tab and try again.";
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="text-slate-600 font-bold animate-pulse">Setting up secure session...</p>
    </div>
  );
};

export default ImpersonateSession;
