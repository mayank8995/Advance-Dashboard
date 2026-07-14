import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginClassName,
  loginLabelclassNAme,
  NAV_ITEMS,
} from '../../utils/constants';
import FormField from '../../components/Form/FormField';
import { validateField } from '../../services/form-validation.service';
import type { LoginForm } from '../../types/types';
import { doLogin } from '../../api/admin-portal.api';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

// LoginCard.jsx
function Login({ onCustomEvent }: any) {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const context = useAuth();
  // console.log("context>>>>",context)

  function checkFormValidity() {
    let valid: boolean = true;
    for (const key of Object.keys(form) as Array<keyof LoginForm>) {
      let msg = validateField(key, form[key]);
      if (msg) valid = false;
      // console.log("msg>>>",msg)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: msg,
      }));
    }
    return valid;
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("Form submitted smoothly without a reload!");
    try {
      if (checkFormValidity()) {
        // console.log("inside herer")
        let res;
        setIsLoading(true);
        res = await doLogin(form);
        if (res.status === 200) {
          setIsLoading(false);
          toast.success(res.data.message, {});
          context.login({ ...res.data.user });
          navigate(NAV_ITEMS.DASHBOARD);
        } else {
          toast.error(res.data.message, {});
          console.log('in else POST SUCCESS', res);
          setIsLoading(false);
        }
      } else {
        // console.log("ELSE SUBMIT");
        setIsLoading(false);
      }
    } catch (err) {
      console.error('POST FAILED', err);
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    // console.log("onchange data",name, value);
    try {
      setForm((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
      let msg = validateField(name, value);
      // console.log("msg>>>",msg)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: msg,
      }));
    } catch (e: any) {}
  };
  return (
    <div className="h-100 md:max-h-150 md:h-127.5 bg-[#211a3d] border border-[#7c3aed]/20 rounded-2xl shadow-2xl shadow-[#2d1b4e]/60 p-4 md:p-8 w-full max-w-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-white font-bold text-xl">Welcome back</h2>
        <p className="text-slate-400 text-sm">Sign in to your account</p>
      </div>

      {/* Email */}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <div className="mb-4 flex flex-col">
            <label className={loginLabelclassNAme}>Username/Admin ID</label>
            <FormField
              errors={errors}
              value={form?.email}
              name={'email'}
              type={'email'}
              placeholder={'you@example.com'}
              onChange={handleOnChange}
              className={loginClassName}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label className={loginLabelclassNAme}>Password</label>
            <FormField
              errors={errors}
              value={form?.password}
              name={'password'}
              type={'password'}
              placeholder={'••••••••'}
              onChange={handleOnChange}
              className={loginClassName}
            />
            {/* <a href="#" className="text-sm text-blue-500">Forgot password?</a> */}
          </div>
        </div>

        {/* Password */}
        {/* <div className="mb-4">
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
        </div> */}

        {/* Remember me */}
        {/* <div className="flex items-center gap-2 mb-5">
          <input type="checkbox" id="remember" className="w-4 h-4 cursor-pointer" />
          <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
            Remember me for 30 days
          </label>
        </div> */}

        {/* Submit */}
        <button
          type="submit"
          className=" w-full bg-[#534ab7] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity  hover:bg-gray-700  mt-4  mb-4 px-6 
                         text-sm
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                        hover:enabled:from-slate-800 hover:enabled:to-gray-900
                        
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <TailSpin
              visible={true}
              height={20}
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass="flex items-center justify-center"
            />
          ) : (
            <>Sign in</>
          )}
        </button>
      </form>
      {/* Sign up link */}
      {/* <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a onClick={() => onCustomEvent(false)} className="text-blue-500">Create one</a>
        </p> */}
      <p className="text-center text-slate-400 text-sm">
        Don't have an account?{' '}
        <span
          onClick={() => onCustomEvent(false)}
          className="text-[#9d8df1] cursor-pointer"
        >
          Create one
        </span>
      </p>
    </div>
  );
}
export default Login;
