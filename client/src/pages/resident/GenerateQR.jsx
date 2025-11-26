import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
    QrCodeIcon,
    UserIcon,
    CalendarIcon,
    ClockIcon,
    TruckIcon,
    PhoneIcon,
    IdentificationIcon,
    ArrowDownTrayIcon,
    ShareIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const initialVisits = [
    { id: 1, visitor: 'María González', date: 'Hoy', time: '14:30', status: 'Ingresó', statusColor: 'bg-green-100 text-green-800' },
    { id: 2, visitor: 'Pedro Soto', date: 'Hoy', time: '18:00', status: 'Pendiente', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: 3, visitor: 'Ana López', date: 'Ayer', time: '20:00', status: 'Salió', statusColor: 'bg-gray-100 text-gray-800' },
]

export default function GenerateQR() {
    const [visits, setVisits] = useState(initialVisits)
    const [generatedQR, setGeneratedQR] = useState(null)
    const [formData, setFormData] = useState({
        visitorName: '',
        visitorRUT: '',
        visitorPhone: '',
        type: 'Familiar',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        hasVehicle: false,
        vehiclePlate: '',
        observations: ''
    })

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleGenerateQR = () => {
        if (!formData.visitorName || !formData.visitorRUT || !formData.date || !formData.time) {
            toast.error('Por favor completa los campos obligatorios')
            return
        }

        const qrData = {
            visit_code: `VIS-2025-${Math.floor(Math.random() * 1000)}`,
            visitor_name: formData.visitorName,
            visitor_rut: formData.visitorRUT,
            unit: "A-402",
            resident: "Carlos Ruiz",
            date: formData.date,
            time: formData.time,
            vehicle_plate: formData.hasVehicle ? formData.vehiclePlate : null
        }

        setGeneratedQR(qrData)

        // Add to active visits
        const newVisit = {
            id: Date.now(),
            visitor: formData.visitorName,
            date: 'Hoy', // Simplified for demo
            time: formData.time,
            status: 'Pendiente',
            statusColor: 'bg-yellow-100 text-yellow-800'
        }
        setVisits([newVisit, ...visits])

        toast.success('QR generado exitosamente')
    }

    const handleShareWhatsApp = () => {
        toast.success(`QR enviado por WhatsApp a ${formData.visitorPhone || '+56 9 XXXX XXXX'}`, { icon: '📱' })
    }

    const handleShareEmail = () => {
        toast.success('QR enviado a email del visitante', { icon: '📧' })
    }

    const handleDownload = () => {
        toast.success('Descargando código QR...', { icon: '💾' })
    }

    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Generar QR para Visitas</h1>
                <p className="mt-1 text-sm text-gray-500">Crea un código QR para que tus invitados ingresen sin problemas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
                {/* Form Column (60%) */}
                <div className="lg:col-span-3 bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Datos de la Visita</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Nombre del Visitante *</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="visitorName"
                                        value={formData.visitorName}
                                        onChange={handleInputChange}
                                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                        placeholder="Ej: Juan Pérez"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">RUT Visitante *</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <IdentificationIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="visitorRUT"
                                        value={formData.visitorRUT}
                                        onChange={handleInputChange}
                                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                        placeholder="12.345.678-9"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Teléfono (Opcional)</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="visitorPhone"
                                        value={formData.visitorPhone}
                                        onChange={handleInputChange}
                                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                        placeholder="+56 9..."
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Tipo de Visita</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border"
                                >
                                    <option>Familiar</option>
                                    <option>Amigo</option>
                                    <option>Proveedor/Técnico</option>
                                    <option>Delivery</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha *</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hora Estimada *</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ClockIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <div className="flex items-center mb-4">
                                    <input
                                        id="hasVehicle"
                                        name="hasVehicle"
                                        type="checkbox"
                                        checked={formData.hasVehicle}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="hasVehicle" className="ml-2 block text-sm text-gray-900">
                                        ¿Llegará en auto?
                                    </label>
                                </div>

                                {formData.hasVehicle && (
                                    <div className="relative rounded-md shadow-sm animate-fadeIn">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <TruckIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="vehiclePlate"
                                            value={formData.vehiclePlate}
                                            onChange={handleInputChange}
                                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                            placeholder="Patente del Vehículo"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                                <textarea
                                    name="observations"
                                    rows={3}
                                    value={formData.observations}
                                    onChange={handleInputChange}
                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    placeholder="Información adicional para conserjería..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleGenerateQR}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                <QrCodeIcon className="-ml-1 mr-2 h-5 w-5" />
                                Generar QR
                            </button>
                        </div>
                    </div>
                </div>

                {/* QR Preview Column (40%) */}
                <div className="lg:col-span-2">
                    <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">Código de Acceso</h3>

                        <div className="flex flex-col items-center justify-center min-h-[300px]">
                            {generatedQR ? (
                                <div className="w-full flex flex-col items-center animate-fadeIn">
                                    <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-teal-100 mb-6">
                                        <QRCodeSVG
                                            value={JSON.stringify(generatedQR)}
                                            size={200}
                                            level="H"
                                            includeMargin={true}
                                        />
                                    </div>

                                    <div className="text-center w-full mb-6 space-y-2">
                                        <h4 className="text-xl font-bold text-gray-900">{generatedQR.visitor_name}</h4>
                                        <p className="text-sm text-gray-500">{generatedQR.date} - {generatedQR.time}</p>
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                            {generatedQR.visit_code}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 w-full">
                                        <button
                                            onClick={handleShareWhatsApp}
                                            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-sm"
                                        >
                                            <ShareIcon className="mr-2 h-4 w-4" />
                                            Enviar por WhatsApp
                                        </button>
                                        <button
                                            onClick={handleShareEmail}
                                            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
                                        >
                                            <ShareIcon className="mr-2 h-4 w-4" />
                                            Enviar por Email
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
                                        >
                                            <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
                                            Descargar QR
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-gray-400">
                                    <QrCodeIcon className="mx-auto h-24 w-24 text-gray-200 mb-4" />
                                    <p className="text-sm">Completa el formulario y genera<br />el QR para tu visita</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Visits List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Mis Visitas Activas</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Visitante
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha/Hora
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Acciones</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {visits.map((visit) => (
                                <tr key={visit.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {visit.visitor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {visit.date} - {visit.time}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${visit.statusColor}`}>
                                            {visit.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-3">
                                            <button className="text-teal-600 hover:text-teal-900">
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
