import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

export const ProtectedRoute = ({ children, requiredRole }) => {
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setLoading(false);
                return;
            }

            setIsAuthenticated(true);
            // Obtener rol del usuario desde metadata o localStorage como fallback
            const role = user.user_metadata?.role || localStorage.getItem('userRole');
            setUserRole(role);
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        // Si tiene rol pero no es el requerido, redirigir a su dashboard correspondiente
        if (userRole === 'admin') return <Navigate to="/dashboard" replace />;
        if (userRole === 'resident') return <Navigate to="/resident/dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return children;
};
