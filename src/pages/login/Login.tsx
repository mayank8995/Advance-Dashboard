/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GUEST_LOGIN,
  loginClassName,
  loginLabelclassNAme,
  NAV_ITEMS,
} from '../../utils/constants';
import FormField from '../../components/Form/FormField';
import { validateField } from '../../services/form-validation.service';
import type { LoginData, LoginForm } from '../../types/types';
import { doLogin } from '../../api/admin-portal.api';
import { TailSpin } from 'react-loader-spinner';
import { toast, type ToastContent } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { getApiErrorDetails } from '../../services/utils.service';

// LoginCard.jsx
function Login({
  onCustomEvent,
  isGuest,
}: {
  onCustomEvent: (flag: boolean) => void;
  isGuest?: boolean;
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const guestLoginStarted = useRef(false);
  useEffect(() => {
    if (!isGuest || guestLoginStarted.current) return;
    guestLoginStarted.current = true;
    if (isGuest) {
      const guestForm = GUEST_LOGIN;
      setForm((prev) => ({
        ...prev,
        ...guestForm,
      }));
      handleLogin(guestForm);
    }
  }, [isGuest]);

  function checkFormValidity(form: LoginForm) {
    let valid: boolean = true;
    for (const key of Object.keys(form) as Array<keyof LoginForm>) {
      const msg = validateField(key, form[key]);
      if (msg) {
        valid = false;
      }
      // console.log("msg>>>",msg)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: msg,
      }));
    }
    return valid;
  }
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleLogin(form);
  };

  const handleLogin = async (form: LoginForm) => {
    try {
      if (checkFormValidity(form)) {
        // console.log("inside herer")
        setIsLoading(true);
        const res: {
          status?: number;
          data?: { user?: LoginData; message?: ToastContent<unknown> };
        } | null = await doLogin(form);
        if (res.status === 200) {
          setIsLoading(false);
          toast.success(res?.data?.message, {});
          login({ ...res?.data?.user } as LoginData);
          navigate(NAV_ITEMS.DASHBOARD);
        } else {
          toast.error(res?.data?.message, {});
          setIsLoading(false);
        }
      } else {
        // console.log("ELSE SUBMIT");
        setIsLoading(false);
      }
    } catch (err) {
      const { message } = getApiErrorDetails(err);
      toast.error(message, {});
      console.error('POST FAILED', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    // console.log("onchange data",name, value);
    try {
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      const msg = validateField(name, value);
      // console.log("msg>>>",msg)
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: msg,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="h-100 md:max-h-150 md:h-127.5 bg-violet-50 border-violet-200 dark:bg-[#211a3d] border dark:border-[#7c3aed]/20  rounded-2xl shadow-2xl shadow-[#2d1b4e]/60 p-4 md:p-8 w-full max-w-md">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-slate-900 dark:text-white font-bold text-lg md:text-xl">
          Welcome back
        </h2>
        <p className="text-slate-900 dark:text-white text-sm font-medium">
          Sign in to your account
        </p>
      </div>

      {/* Email */}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className={loginLabelclassNAme}>
              Username/Admin ID
            </label>
            <FormField
              errors={errors}
              value={form?.email}
              name={'email'}
              type={'email'}
              placeholder={'you@example.com'}
              className={loginClassName}
              id={'email'}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className={loginLabelclassNAme}>
              Password
            </label>
            <FormField
              errors={errors}
              value={form?.password}
              name={'password'}
              type={'password'}
              placeholder={'••••••••'}
              className={loginClassName}
              id={'password'}
              onChange={handleOnChange}
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
          disabled={isLoading}
          className={` w-full bg-[#534ab7] text-white font-semibold py-3 rounded-lg mt-4  mb-4 px-6 
                         text-sm
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40   
                        hover:enabled:bg-[#8e89f2]                     
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed
                         ${[isLoading ? 'disabled:bg-[#8e89f2] cursor-not-allowed' : undefined].filter(Boolean).join(' ')}
                        `}
        >
          {isLoading ? (
            <TailSpin
              visible={true}
              height={20}
              color="#fff"
              radius="4"
              ariaLabel="tail-spin-loading"
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
      <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
        Don't have an account?{' '}
        <button
          onClick={() => onCustomEvent(false)}
          className="text-[#9d8df1] cursor-pointer"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
export default Login;
