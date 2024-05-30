
export default function EmailPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Check your email to continue</h1>
                <p className="text-gray-600 dark:text-white">We have sent a verification link to your email address. Please check your inbox and click on the link to continue.</p>
            </div>
        </div>
    );
}