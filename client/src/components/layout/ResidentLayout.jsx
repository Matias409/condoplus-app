import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../config/supabase';
import { Home, CreditCard, Calendar, QrCode, AlertTriangle, Vote, Bell, LogOut } from 'lucide-react';

const ResidentLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeModule, setActiveModule] = useState('dashboard');

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('userRole');
        navigate('/login', { replace: true });
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/resident/dashboard' },
        { id: 'pagos', label: 'Mis Pagos', icon: CreditCard, path: '/resident/pagos' },
        { id: 'reservas', label: 'Reservar Espacios', icon: Calendar, path: '/resident/reservas' },
        { id: 'qr', label: 'Generar QR Visita', icon: QrCode, path: '/resident/qr' },
        { id: 'incidencias', label: 'Mis Incidencias', icon: AlertTriangle, path: '/resident/incidencias' },
        { id: 'votaciones', label: 'Votaciones', icon: Vote, path: '/resident/votaciones' },
        { id: 'comunicados', label: 'Comunicados', icon: Bell, path: '/resident/comunicaciones' },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-teal-600 text-white flex flex-col">
                <div className="p-6 border-b border-teal-500">
                    <h1 className="text-2xl font-bold">CondoPlus</h1>
                    <p className="text-teal-100 text-sm mt-1">PORTAL RESIDENTE</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveModule(item.id);
                                    navigate(item.path);
                                }}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-white text-teal-600 font-semibold shadow-md'
                                        : 'text-white/90 hover:bg-teal-700 hover:text-white'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-teal-500">
                    <div className="flex items-center gap-3 mb-4 p-3 bg-teal-700 rounded-lg">
                        <div className="w-10 h-10 bg-white text-teal-600 rounded-full flex items-center justify-center font-bold">
                            CR
                        </div>
                        <div>
                            <p className="font-semibold">Carlos Ruiz</p>
                            <p className="text-xs text-teal-200">Unidad A-402</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-700 hover:bg-teal-800 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ResidentLayout;
