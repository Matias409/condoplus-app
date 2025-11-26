import { useState, useEffect } from 'react'
import {
    CreditCardIcon,
    BanknotesIcon,
    CalendarIcon,
    ArrowDownTrayIcon,
    ClockIcon
} from '@heroicons/react/24/outline'
import { supabase } from '../../config/supabase'
import toast from 'react-hot-toast'

export default function MyPayments() {
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        fetchMyPayments()
    }, [])

    const fetchMyPayments = async () => {
        try {
            // Obtener usuario actual de auth
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) return

            // Obtener el user de public.users usando su email
            const { data: publicUser, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('email', user.email)
                .maybeSingle()

            if (userError) throw userError

            if (!publicUser) {
                console.error('Usuario no encontrado en public.users:', user.email)
                toast.error('No se encontró tu perfil de residente')
                return
            }

            // Obtener sus pagos usando el id de public.users
            const { data: paymentsData, error } = await supabase
                .from('payments')
                .select('*')
                .eq('user_id', publicUser.id)
                .order('due_date', { ascending: false })

            if (error) throw error
            setPayments(paymentsData)

        } catch (error) {
            console.error('Error fetching payments:', error)
            toast.error(`❌ Error al cargar pagos: ${error.message || 'Error desconocido'}`)
        } finally {
            setLoading(false)
        }
    }

    const handleSimulatePayment = async () => {
        if (!selectedPayment) return
        setIsProcessing(true)
        try {
            const { error } = await supabase
                .from('payments')
                .update({
                    status: 'approved',
                    paid_at: new Date().toISOString(),
                    payment_method: 'Simulado'
                })
                .eq('id', selectedPayment.id)

            if (error) throw error

            toast.success('✅ Pago registrado exitosamente')
            setShowPaymentModal(false)
            setSelectedPayment(null)
            await fetchMyPayments()

        } catch (error) {
            console.error('Error:', error)
            toast.error('❌ Error al registrar pago')
        } finally {
            setIsProcessing(false)
        }
    }

    const openPaymentModal = (payment) => {
        setSelectedPayment(payment)
        setShowPaymentModal(true)
    }

    const pendingPayments = payments.filter(p => p.status === 'pending' || p.status === 'overdue')
    const historyPayments = payments.filter(p => p.status === 'paid' || p.status === 'approved')

    // Calculate stats
    const totalPending = pendingPayments.reduce((acc, curr) => acc + curr.amount, 0)
    const totalPaidYear = historyPayments.reduce((acc, curr) => acc + curr.amount, 0)
    const nextDueDate = pendingPayments.length > 0
        ? new Date(pendingPayments[pendingPayments.length - 1].due_date).toLocaleDateString()
        : '-'

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Mis Pagos</h1>
                    <p className="mt-1 text-sm text-gray-500">Gestiona tus gastos comunes y revisa tu historial</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Saldo Pendiente</dt>
                            <dd className={`mt-1 text-3xl font-semibold ${totalPending > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                ${totalPending.toLocaleString()}
                            </dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Pagado Total</dt>
                            <dd className="mt-1 text-3xl font-semibold text-green-600">${totalPaidYear.toLocaleString()}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Próximo Vencimiento</dt>
                            <dd className="mt-1 text-3xl font-semibold text-yellow-600">
                                {nextDueDate}
                            </dd>
                        </div>
                    </div>
                </div>

                {/* Pending Payments Cards */}
                {pendingPayments.map(payment => (
                    <div key={payment.id} className="bg-white rounded-lg shadow-lg border-l-4 border-red-500 overflow-hidden mb-8">
                        <div className="px-6 py-8 sm:p-10">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium mb-4 ${payment.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {payment.status === 'overdue' ? 'VENCIDO' : 'PENDIENTE'}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                        Gasto Común {payment.period}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {payment.description}
                                    </p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <p className="text-4xl font-extrabold text-gray-900">${payment.amount.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-100 pt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                    Creado: {new Date(payment.created_at).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" />
                                    Vence: {new Date(payment.due_date).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => openPaymentModal(payment)}
                                    className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                >
                                    <CreditCardIcon className="-ml-1 mr-3 h-5 w-5" />
                                    Pagar Ahora
                                </button>
                                <button className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                                    <ArrowDownTrayIcon className="-ml-1 mr-3 h-5 w-5 text-gray-400" />
                                    Descargar Boleta
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Payment History */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Historial de Pagos</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mes/Periodo
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha de Pago
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Monto
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Comprobante
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {historyPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {payment.period}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(payment.paid_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${payment.amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Pagado
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-teal-600 hover:text-teal-900 inline-flex items-center">
                                                <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                                                Descargar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {historyPayments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No hay historial de pagos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Modal */}
                {showPaymentModal && selectedPayment && (
                    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => !isProcessing && setShowPaymentModal(false)}></div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
                                        <BanknotesIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Confirmar Pago
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Estás a punto de pagar el Gasto Común de {selectedPayment.period} por un monto de <span className="font-bold text-gray-900">${selectedPayment.amount.toLocaleString()}</span>.
                                            </p>

                                            <div className="mt-4 space-y-3 text-left">
                                                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input type="radio" name="payment-method" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" defaultChecked />
                                                    <span className="ml-3 block text-sm font-medium text-gray-700">WebPay / Tarjeta de Crédito</span>
                                                </label>
                                                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input type="radio" name="payment-method" className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                                                    <span className="ml-3 block text-sm font-medium text-gray-700">Transferencia Bancaria</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleSimulatePayment}
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => setShowPaymentModal(false)}
                                        disabled={isProcessing}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
