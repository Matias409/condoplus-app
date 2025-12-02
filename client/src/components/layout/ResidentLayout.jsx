import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../config/supabase';
import { Home, CreditCard, Calendar, QrCode, AlertTriangle, Vote, Bell, LogOut, HelpCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

const ResidentLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeModule, setActiveModule] = useState('dashboard');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Help Modal State
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [helpForm, setHelpForm] = useState({ subject: '', message: '' });
    const [isSubmittingHelp, setIsSubmittingHelp] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem('userRole');
        navigate('/login', { replace: true });
    };

    const handleHelpSubmit = async (e) => {
        e.preventDefault();
        if (!helpForm.subject || !helpForm.message) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        setIsSubmittingHelp(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase
                .from('incidents')
                .insert({
                    title: `[Ayuda] ${helpForm.subject}`,
                    description: helpForm.message,
                    category: 'Soporte',
                    priority: 'Media',
                    status: 'Abierta',
                    user_id: user.id
                });

            if (error) throw error;

            toast.success('Solicitud de ayuda enviada. Te contactaremos pronto.');
            setIsHelpOpen(false);
            setHelpForm({ subject: '', message: '' });
        } catch (error) {
            console.error('Error sending help request:', error);
            toast.error('Error al enviar la solicitud');
        } finally {
            setIsSubmittingHelp(false);
        }
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
        <div className="flex h-screen w-full overflow-hidden bg-gray-50">
            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Header (Hamburger) */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-teal-600 text-white p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                    <img src="/condoplus-logo.jpg" alt="Logo" className="h-8 w-8 rounded-md" />
                    <span className="font-bold text-lg">CondoPlus</span>
                </div>
                <button onClick={() => setIsMobileOpen(true)} className="p-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-teal-600 text-white flex flex-col transition-transform duration-300 ease-in-out shadow-xl
                md:relative md:translate-x-0
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-teal-500 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <img src="/condoplus-logo.jpg" alt="Logo" className="h-10 w-10 rounded-lg" />
                            <h1 className="text-2xl font-bold">CondoPlus</h1>
                        </div>
                        <p className="text-teal-100 text-sm mt-1">PORTAL RESIDENTE</p>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-teal-100 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
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
                                    setIsMobileOpen(false); // Close sidebar on mobile selection
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

                <div className="p-4 border-t border-teal-500 space-y-2">
                    <button
                        onClick={() => setIsHelpOpen(true)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-700/50 hover:bg-teal-700 text-teal-100 hover:text-white transition-all"
                    >
                        <HelpCircle className="w-5 h-5" />
                        <span>Ayuda / Soporte</span>
                    </button>

                    <div className="flex items-center gap-3 p-3 bg-teal-700 rounded-lg">
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
            <div className="flex-1 flex flex-col overflow-hidden pt-16 md:pt-0">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>

            {/* Help Modal */}
            {isHelpOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-teal-600 rounded-t-2xl">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <HelpCircle className="h-6 w-6" />
                                ¿Necesitas Ayuda?
                            </h3>
                            <button onClick={() => setIsHelpOpen(false)} className="text-teal-100 hover:text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleHelpSubmit} className="p-6 space-y-4">
                            <p className="text-gray-600 text-sm">
                                Cuéntanos qué problema tienes o qué necesitas. El equipo de administración recibirá tu mensaje inmediatamente.
                            </p>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                                <input
                                    type="text"
                                    value={helpForm.subject}
                                    onChange={(e) => setHelpForm({ ...helpForm, subject: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Ej: Problema con mi pago"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                <textarea
                                    value={helpForm.message}
                                    onChange={(e) => setHelpForm({ ...helpForm, message: e.target.value })}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Describe tu situación..."
                                    required
                                />
                            </div>

                            <div className="pt-2 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsHelpOpen(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmittingHelp}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium shadow-sm transition-colors disabled:opacity-50"
                                >
                                    {isSubmittingHelp ? 'Enviando...' : 'Enviar Solicitud'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResidentLayout;
