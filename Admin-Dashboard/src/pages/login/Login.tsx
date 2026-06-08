import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../utils/constants";

// LoginCard.jsx
function Login() {

  const navigate = useNavigate();
    const formValuesRef: any = useRef({
                            email: '',
                            password: ''
                          });

   const handleSubmit = (e: any) => {
    console.log("Form submitted smoothly without a reload!",formValuesRef.current);
    navigate(NAV_ITEMS.DASHBOARD);
    e.preventDefault(); 
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    console.log("onchange data",name, value);
    try{
      formValuesRef.current[name] = value;
    }catch(e:any){

    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        {/* Email */}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm text-gray-500 block mb-1.5">Username/Admin ID</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onChange={handleOnChange}
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
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleOnChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember me */}
        {/* <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" id="remember" className="w-4 h-4 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
            Remember me for 30 days
          </label>
        </div> */}

        {/* Submit */}
        <button  type="submit" className="cursor-pointer w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors mb-4">
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