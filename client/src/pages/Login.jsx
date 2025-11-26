import LoginForm from '../components/auth/LoginForm'

export default function Login() {
    return (
        <div className="w-screen min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo placeholder if needed outside the form */}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <LoginForm />
            </div>
        </div>
    )
}
