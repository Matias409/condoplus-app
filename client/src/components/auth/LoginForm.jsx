import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '../../config/supabase'
import toast from 'react-hot-toast'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const schema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const { data: authData, error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            if (error) throw error

            // Obtener rol del usuario
            const role = authData.user.user_metadata?.role

            if (!role) {
                toast.error('Usuario sin rol asignado')
                await supabase.auth.signOut()
                return
            }

            // Guardar rol y redirigir
            localStorage.setItem('userRole', role)
            toast.success('¡Bienvenido!')

            if (role === 'admin') {
                navigate('/dashboard')
            } else if (role === 'resident') {
                navigate('/resident/dashboard')
            } else {
                toast.error('Rol no válido')
                await supabase.auth.signOut()
            }

        } catch (error) {
            toast.error(error.message || 'Error al iniciar sesión')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md">
            <div className="text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900">CondoPlus</h2>
                <p className="text-gray-500 mt-2">Bienvenido de nuevo. Por favor ingresa tus datos.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            {...register('email')}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#FF5722] focus:border-[#FF5722]'} rounded-lg focus:outline-none focus:ring-1 transition-colors`}
                            placeholder="tu@email.com"
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LockClosedIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            {...register('password')}
                            className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-[#FF5722] focus:border-[#FF5722]'} rounded-lg focus:outline-none focus:ring-1 transition-colors`}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-[#FF5722] focus:ring-[#FF5722] border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                            Recordarme
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-[#FF5722] hover:text-orange-700 transition-colors">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#FF5722] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5722] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                >
                    {isLoading ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Iniciando sesión...
                        </div>
                    ) : (
                        'Iniciar Sesión'
                    )}
                </button>
            </form>
        </div>
    )
}
