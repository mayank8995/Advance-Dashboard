// import { useNavigate } from "react-router-dom";
// import FormField from "../../components/Form/FormField";
// import { className, labelclassName } from "../../utils/constants";
import { useState } from "react";
import { initialFormData, type Errors, type FormData } from "../../types/types";
import { className, labelclassName, stepConfig } from "../../utils/constants";
import FormField from "../../components/Form/FormField";
import { TailSpin } from "react-loader-spinner";
import { validateField } from "../../services/form-validation.service";
import { doSignup } from "../../api/admin-portal-api/admin-portal.api";

export default function Signup() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);


  const updateStep = <K extends keyof FormData>(key: K, data: FormData[K], activeKey:string) => {
    // console.log(key," <><><> ",data,activeKey);
    setFormData(prev => ({ ...prev, [key]: data }));
    let field = activeKey as keyof typeof data
    let msg = validateField(activeKey, data && data[field]);
        setErrors((prevErrors) => ({
                    ...prevErrors,
          [field]: msg,
                    })); 
  };


  const handleNext = () => {
    const { key, validate } = stepConfig[step];
    const stepErrors = validate(formData[key] as any);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length === 0) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleFinalSubmit = async () => {
   console.log("final formData>>>",formData, {...formData})
    // re-validate everything, not just the last step
    const allErrors = stepConfig.reduce<Errors>((acc, { key, validate }) => {
      return { ...acc, ...validate(formData[key] as any) };
    }, {});

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      // jump back to the first step that has an error
      const firstBadStep = stepConfig.findIndex(
        ({ key, validate }) => Object.keys(validate(formData[key] as any)).length > 0
      );
      setStep(firstBadStep);
      return;
    }
     try {
                            let res;
                            setIsLoading(true);
                            res = await doSignup({...formData['formOne'], ...formData['formTwo']});
                            if(res){
                              setIsLoading(false);
                              window.location.reload();
                            }
        } catch(err) {
            console.error("POST FAILED", err);
                setIsLoading(false);
        }

  };

  const steps = [
    <StepOneForm data={formData.formOne} errors={errors} onChange={(d,k) => updateStep('formOne', d,k)} />,
    <StepTwoForm data={formData.formTwo} errors={errors} onChange={(d,k) => updateStep('formTwo', d,k)} />
  ];

  const isLastStep = step === stepConfig.length - 1;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md">
        <form  noValidate>
        {steps[step]}
            <div>
                {step > 0 && <button className=" w-full bg-gray-900   hover:bg-gray-700  mb-4  px-6 py-2.5
                                text-white font-semibold text-sm 
                                rounded-xl
                                shadow-lg shadow-indigo-500/30
                                hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                                hover:enabled:from-slate-800 hover:enabled:to-gray-900
                                transition-all duration-200
                                cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed" onClick={handleBack}>Back</button>}
                {isLastStep
                ? <button type="button" onClick={handleFinalSubmit} className=" w-full bg-gray-900   hover:bg-gray-700  mb-4  px-6 py-2.5
                                text-white font-semibold text-sm 
                                rounded-xl
                                shadow-lg shadow-indigo-500/30
                                hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                                hover:enabled:from-slate-800 hover:enabled:to-gray-900
                                transition-all duration-200
                                cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed">{isLoading ? <TailSpin
                                        visible={true}
                                        height={20}
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass="flex items-center justify-center"
                                        /> : <>Submit</>}</button>
                : <button  type="button" className=" w-full bg-gray-900   hover:bg-gray-700  mb-4  px-6 py-2.5
                                text-white font-semibold text-sm 
                                rounded-xl
                                shadow-lg shadow-indigo-500/30
                                hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                                hover:enabled:from-slate-800 hover:enabled:to-gray-900
                                transition-all duration-200
                                cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed" onClick={handleNext}>Next</button>}
            </div>
        </form>
    </div>
  );
}

export function StepOneForm({ data, errors, onChange }: {
  data: FormData['formOne'];
  errors: Errors;
  onChange: (data: FormData['formOne'], activeKey:string) => void;
}) {
  return (
    <>
      <div className="mb-4 flex flex-col-reverse">
                         <FormField  data={data} errors={errors} value={data?.name} name={"name"} type={"text"} placeholder={"Enter your name"} onChange={onChange} className={className} />
                         <label
                             className={labelclassName}
                             >
                            Name
                         </label>
        </div>
   <div className="mb-4 flex flex-col-reverse">
                         <FormField  data={data} errors={errors} value={data?.email} name={"email"} type={"email"} placeholder={"you@example.com"} onChange={onChange} className={className} />
                         <label
                             className={labelclassName}
                             >
                            Email
                        </label>
                    </div>
                     <div className="mb-4 flex flex-col-reverse">
                        <FormField  data={data} errors={errors} value={data?.password} name={"password"} type={"password"} placeholder={"••••••••"} onChange={onChange} className={className} />
                        <label
                            className={labelclassName}
                            >
                           Password
                        </label>
                    </div>
                    <div className="mb-4 flex flex-col-reverse">
                        <FormField  data={data} errors={errors} value={data?.confirmPassword} name={"confirmPassword"} type={"password"} placeholder={"••••••••"} onChange={onChange} className={className} />
                        <label
                            className={labelclassName}
                            >
                           Confirm Password
                        </label>
                    </div>
        </>
  );
}

export function StepTwoForm({ data, errors, onChange }: {
  data: FormData['formTwo'];
  errors: Errors;
  onChange: (data: FormData['formTwo'],activeKey:string) => void;
}) {
  return (
    <>
     <div className="mb-4 flex flex-col-reverse">
                         <FormField data={data}  errors={errors} value={data?.department} name={"department"} type={"text"} placeholder={"Enter your department"} onChange={onChange} className={className} />
                         <label
                            className={labelclassName}
                            >
                           Department
                        </label>
                    </div>
                     <div className="mb-4 flex flex-col-reverse">
                        <FormField  data={data} errors={errors} value={data?.designation} name={"designation"} type={"text"} placeholder={"Enter your designation"} onChange={onChange} className={className} />
                        <label
                            className={labelclassName}
                            >
                           Designation
                        </label>
                    </div>
                     <div className="mb-4 flex flex-col-reverse">
                        <FormField data={data}  errors={errors} value={data?.empId} name={"empId"} type={"text"} placeholder={"you@example.com"} onChange={onChange} className={className} />
                        <label
                            className={labelclassName}
                            >
                           Employee Id
                        </label>
                    </div>
                    {/* <button  type="button" className=" w-full bg-gray-900   hover:bg-gray-700  mb-4  px-6 py-2.5
                        text-white font-semibold text-sm 
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                        hover:enabled:from-slate-800 hover:enabled:to-gray-900
                        transition-all duration-200
                        cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={previous}
                        >
                            Previous
                    </button>
                    <button  type="submit" className=" w-full bg-gray-900   hover:bg-gray-700  mb-4  px-6 py-2.5
                                    text-white font-semibold text-sm
                                    rounded-xl
                                    shadow-lg shadow-indigo-500/30
                                    hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40
                                    hover:enabled:from-slate-800 hover:enabled:to-gray-900
                                    transition-all duration-200
                                    cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                                    >
                                        Submit
                    </button> */}
    </>
  );
}