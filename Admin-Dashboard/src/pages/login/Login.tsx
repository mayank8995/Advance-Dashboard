// LoginCard.jsx
function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Email */}
        <form>
        <div className="mb-4">
          <label className="text-sm text-gray-500 block mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <label className="text-sm text-gray-500">Password</label>
            <a href="#" className="text-sm text-blue-500">Forgot password?</a>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" id="remember" className="w-4 h-4 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors mb-4">
          Sign in
        </button>
        </form>
        {/* Sign up link */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="#" className="text-blue-500">Create one</a>
        </p>

      </div>
    </div>
  );
}
export default Login