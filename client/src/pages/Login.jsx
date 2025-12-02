import LoginForm from '../components/auth/LoginForm'
import { HomeIcon } from '@heroicons/react/24/solid'

export default function Login() {
    return (
        <div className="w-screen min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8 lg:p-12 xl:p-24 relative">
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>

                <div className="absolute bottom-8 text-xs text-gray-400">
                    © 2025 CondoPlus. Todos los derechos reservados.
                </div>
            </div>

            {/* Right Side - Image & Content */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] relative overflow-hidden">
                {/* Background Image Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop')`
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-16 xl:p-24 w-full">
                    <div className="mb-8">
                        <div className="mb-6">
                            <img src="/condoplus-logo.jpg" alt="CondoPlus Logo" className="h-24 w-auto rounded-xl shadow-lg shadow-orange-500/20" />
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                            Gestión inteligente para<br />
                            comunidades modernas.
                        </h1>
                        <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                            Optimiza la administración de tu condominio, mejora la seguridad y conecta con tus residentes en un solo lugar.
                        </p>
                    </div>

                    {/* Slider Indicators (Visual only) */}
                    <div className="flex gap-2 mt-8">
                        <div className="h-1.5 w-8 bg-[#FF5722] rounded-full"></div>
                        <div className="h-1.5 w-2 bg-gray-600 rounded-full"></div>
                        <div className="h-1.5 w-2 bg-gray-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
