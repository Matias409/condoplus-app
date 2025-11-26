import {
    CurrencyDollarIcon,
    UsersIcon,
    ExclamationTriangleIcon,
    ChartBarIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    MinusIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const stats = [
    {
        id: 1,
        name: 'Ingresos del Mes',
        stat: '$32.450.000',
        icon: CurrencyDollarIcon,
        change: '12.5%',
        changeType: 'increase',
        color: 'bg-green-500'
    },
    {
        id: 2,
        name: 'Tasa de Morosidad',
        stat: '12.3%',
        icon: ChartBarIcon,
        change: '2.1%',
        changeType: 'decrease', // Good for delinquency
        color: 'bg-green-500'
    },
    {
        id: 3,
        name: 'Incidencias Activas',
        stat: '8',
        icon: ExclamationTriangleIcon,
        change: '3',
        changeType: 'increase-bad',
        color: 'bg-red-500'
    },
    {
        id: 4,
        name: 'Total Residentes',
        stat: '450',
        icon: UsersIcon,
        change: 'Estable',
        changeType: 'neutral',
        color: 'bg-blue-500'
    },
]

const data = [
    { name: 'Ene', value: 24000000 },
    { name: 'Feb', value: 13980000 },
    { name: 'Mar', value: 28000000 },
    { name: 'Abr', value: 29080000 },
    { name: 'May', value: 28000000 },
    { name: 'Jun', value: 32450000 },
]

const recentActivity = [
    {
        id: 1,
        user: {
            name: 'Juan Pérez',
            imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        action: 'reportó una incidencia',
        target: 'Fuga de agua en Piso 3',
        date: 'Hace 1 hora',
        status: 'pending'
    },
    {
        id: 2,
        user: {
            name: 'María González',
            imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        action: 'realizó un pago',
        target: 'Gastos Comunes Mayo',
        date: 'Hace 3 horas',
        status: 'success'
    },
    {
        id: 3,
        user: {
            name: 'Carlos Rodríguez',
            imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        action: 'reservó un espacio',
        target: 'Quincho A',
        date: 'Hace 5 horas',
        status: 'neutral'
    },
]

export default function Dashboard() {
    return (
        <div className="w-full h-full p-6 lg:p-8">
            <div className="w-full mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Panel General</h1>
                    <p className="mt-1 text-sm text-gray-500">Resumen de gestión - Condominio Los Aromos</p>
                </div>

                {/* Stats Grid */}
                <dl className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {stats.map((item) => (
                        <div
                            key={item.id}
                            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                        >
                            <dt>
                                <div className={`absolute rounded-md p-3 ${item.id === 3 ? 'bg-red-500' : 'bg-primary'}`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
                            </dt>
                            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                                <p
                                    className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'increase' ? 'text-green-600' :
                                        item.changeType === 'decrease' ? 'text-green-600' :
                                            item.changeType === 'increase-bad' ? 'text-red-600' : 'text-gray-500'
                                        }`}
                                >
                                    {item.changeType === 'increase' && <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />}
                                    {item.changeType === 'decrease' && <ArrowDownIcon className="self-center flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />}
                                    {item.changeType === 'increase-bad' && <ArrowUpIcon className="self-center flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />}
                                    {item.changeType === 'neutral' && <MinusIcon className="self-center flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />}
                                    <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                                    {item.change}
                                </p>
                            </dd>
                        </div>
                    ))}
                </dl>

                {/* Charts & Activity */}
                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Chart */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Evolución de Recaudación</h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000000}M`} />
                                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Recaudación']} />
                                    <Line type="monotone" dataKey="value" stroke="#FF6B35" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Actividad Reciente</h3>
                        <div className="flow-root">
                            <ul role="list" className="-mb-8">
                                {recentActivity.map((activity, activityIdx) => (
                                    <li key={activity.id}>
                                        <div className="relative pb-8">
                                            {activityIdx !== recentActivity.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                            ) : null}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.status === 'success' ? 'bg-green-500' :
                                                        activity.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                                                        }`}>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src={activity.user.imageUrl}
                                                            alt=""
                                                        />
                                                    </span>
                                                </div>
                                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            <span className="font-medium text-gray-900">{activity.user.name}</span> {activity.action}{' '}
                                                            <span className="font-medium text-gray-900">{activity.target}</span>
                                                        </p>
                                                    </div>
                                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                        <time dateTime={activity.date}>{activity.date}</time>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
