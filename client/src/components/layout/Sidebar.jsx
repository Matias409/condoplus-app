import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
    Squares2X2Icon,
    CurrencyDollarIcon,
    ExclamationTriangleIcon,
    UsersIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../../config/supabase'
import toast from 'react-hot-toast'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon },
    { name: 'Finanzas', href: '/dashboard/finanzas', icon: CurrencyDollarIcon },
    { name: 'Incidencias', href: '/dashboard/incidencias', icon: ExclamationTriangleIcon },
    { name: 'Residentes', href: '/dashboard/residentes', icon: UsersIcon },
    { name: 'Comunicaciones', href: '/dashboard/comunicaciones', icon: ChatBubbleLeftRightIcon },
    { name: 'Votaciones', href: '/dashboard/votaciones', icon: CheckCircleIcon },
]

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            localStorage.removeItem('userRole')
            toast.success('Sesión cerrada correctamente')
            navigate('/login', { replace: true })
        } catch (error) {
            toast.error('Error al cerrar sesión')
            setIsLoggingOut(false)
        }
    }

    return (
        <>
            {/* Mobile backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
                    onClick={() => setMobileOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1E293B] text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 px-4 bg-[#0F172A] gap-3">
                        <img src="/condoplus-logo.jpg" alt="CondoPlus" className="h-10 w-10 rounded-lg" />
                        <span className="text-xl font-bold tracking-wider text-white">CondoPlus</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-[#FF6B35] text-white'
                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-6 w-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Bottom Section */}
                    <div className="p-4 border-t border-gray-700">
                        <Link
                            to="/configuracion"
                            className="group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <Cog6ToothIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-white" />
                            Configuración
                        </Link>
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full mt-1 group flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-white" />
                            {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
