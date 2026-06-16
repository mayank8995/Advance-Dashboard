import { useEffect, useRef, useState } from "react";
import FormField from "../../components/Form/FormField"
import { className, labelclassName, PROFILE_SUBHEAD, SIDE_BAR_ITEMS } from "../../utils/constants"
import type { ProfileForm } from "../../types/types";
import { editProfileData, getProfileData, postSubmitProfileSettings } from "../../api/MockApi/MockApi";

function Settings(){

    const [profile_pic, setImage] = useState(localStorage.getItem("profile_pic") || null);
    const [initialData, setInitialData] = useState<ProfileForm | null>(null);
    const [isEditing, setIsEditing] = useState(false);
     const formValuesRef = useRef<ProfileForm>({name: '',phone: '',email: '',department: '',designation: '',empId:'',jdate:new Date(),wmode:'',location:'',image:null} as ProfileForm);
     const refForUpload = useRef<HTMLInputElement>(null); // separate ref for image upload


    useEffect(() => {
        // console.log("profile_pic from localStorage on component mount:", localStorage.getItem("profile_pic"), " profile_pic>>",profile_pic);
        const fetchProfileData = async () => {
            const profileData = await getProfileData();
            if(profileData && Object.keys(profileData)?.length > 0) {
                console.log("Profile data fetched:", profileData);
                formValuesRef.current = profileData;
                setIsEditing(true);
                setInitialData(profileData)
            }
        }
    fetchProfileData();
    }, [])
    
     function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log("onchange data", name, value, formValuesRef?.current);
    if (formValuesRef?.current) {
        formValuesRef.current[name as keyof ProfileForm] = value as any;
    }
}

   const handleSubmit = async (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("START SUBMIT");
    try {
        let res;
        if(!isEditing) {
            res = await postSubmitProfileSettings(formValuesRef.current);
        }else{
            res = await editProfileData(formValuesRef.current);
        }
        console.log("POST SUCCESS", res);
    } catch(err) {
        console.error("POST FAILED", err);
    }
    console.log("END SUBMIT");
};

    function onCancel(){
        if(window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")){
            setInitialData({name: '',phone: '',email: '',department: '',designation: '',empId:'',jdate:new Date(),wmode:'',location:'',image:null}); // reset the initial data to clear form fields
        }
    }

    function handleUpload(){
        try{
            refForUpload?.current && refForUpload?.current?.click();
        }catch(e:any){
            console.error("Upload error:", e);
        }
    }
function handleFileChange(e:any){
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
    }

    // (e.g. max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert("File too large, max 2MB");
        return;
    }

    const reader = new FileReader();
    // Fires once the file is fully read as a Base64 Data URL string
    reader.onload = () => {
      const base64String: any = reader.result;
      
      try {

        // Save the raw text string to localStorage
        localStorage.setItem("profile_pic", base64String);

        // Update local React state to reflect changes instantly
        setImage(base64String);
      } catch (error) {
        console.error("Storage limit exceeded or failed:", error, file.size);
        alert("The image is too large to store in local storage.");
      }
    };

    // Convert the file blob into a reusable string
    reader.readAsDataURL(file);
}
    return <>
    <div className="w-full bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 dark:bg-gray-800">
        <div className="p-6 dark:bg-gray-800">
            <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{SIDE_BAR_ITEMS.SETTINGS}</h1>
            <h2 className="text-sm text-slate-400 mt-1 dark:text-slate-300">{PROFILE_SUBHEAD}</h2>
            </div>
            <form  onSubmit = {handleSubmit} className="border-2 border-dotted border-gray-300 p-2" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-8 h-full dark:bg-gradient-to-br dark:from-slate-900 dark:to-green-950/20">
                    <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Avatar</h2>
                    </div>
 
<div className="flex flex-col items-center justify-center gap-4 ">
  
  <div className="relative">
    <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
      <img  src={profile_pic ? profile_pic : 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'} className="w-full h-full object-cover" />
    </div>
      <input ref={refForUpload} onChange={handleFileChange} type="file" style={{display: "none"}} />
  <button
  onClick={handleUpload}
  type="button"
    className="cursor-pointer absolute bottom-1 right-1 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
  >
    ✎
  </button>
  </div>
  {initialData?.name && <div className="text-center">
    <p className="font-bold text-slate-800 dark:text-slate-100">{initialData?.name}</p>
    <p className="text-xs text-slate-400 dark:text-slate-300">{initialData?.designation}</p>
  </div>}
</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Personal Information</h2>
                    </div>
                    <div className="flex flex-col-reverse">
                    <FormField defaultValue={initialData?.name} name={"name"} type={"text"} placeholder={"Enter your name"} onChange={onInputChange} className={className}/>
                        <label
                        className={labelclassName}
                        >
                        Name
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">
                    <FormField defaultValue={initialData?.phone} name={"phone"} type={"text"} placeholder={"Enter your phone number"} onChange={onInputChange} className={className} />
                    <label
                        className={labelclassName}
                        >
                        Phone Number
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">
                    <FormField defaultValue={initialData?.email} name={"email"} type={"email"} placeholder={"Enter your email"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Email
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.department} name={"department"} type={"text"} placeholder={"Enter your department"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Department
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.designation} name={"designation"} type={"text"} placeholder={"Enter your designation"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Designation
                        </label>
                    </div>
                </div>
            </div>
                <div className="border-t-2  border-gray-300 border-dotted"></div>
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-indigo-500 rounded-full" />
                    <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Account Information</h2>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.empId} name={"empId"} type={"text"} placeholder={"Enter your ID"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Employee ID
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.jdate} name={"jdate"} type={"date"} placeholder={"Enter your joining date"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Joining Date
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.wmode} name={"wmode"} type={"text"} placeholder={"Hybrid/Remote/Onsite"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Work Mode
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.location} name={"location"} type={"text"} placeholder={"Enter your location"} onChange={onInputChange} className={className} />
                    <label
                       className={labelclassName}
                        >
                        Location
                        </label>
                    </div>
                </div>
                <div className="border-t-2  border-gray-300 border-dotted"></div>
                {!isEditing && <div className="flex justify-between items-center p-4">
                    <button type="submit"
                    className="
                        px-6 py-2.5
                        bg-gradient-to-r from-indigo-600 to-violet-600
                        text-white font-semibold text-sm
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:shadow-xl hover:shadow-indigo-500/40
                        hover:from-indigo-700 hover:to-violet-700
                        transition-all duration-200
                        cursor-pointer
                    "
                    >
                    Save Profile
                    </button>
 
<button type="button"
  className="
       px-6 py-2.5
  bg-gradient-to-r from-slate-600 to-violet-200
  text-white font-semibold text-sm
  rounded-xl
  shadow-lg shadow-indigo-500/30
  hover:shadow-xl hover:shadow-indigo-500/40
  hover:from-slate-300 hover:to-violet-200
  transition-all duration-200
  cursor-pointer
  "
  onClick={onCancel}
>
  Cancel
</button>
                </div>}
                 {isEditing && <div className="flex justify-between items-center p-4">
                    <button type="submit"
                    className="
                          px-6 py-2.5
                        bg-gradient-to-r from-indigo-600 to-violet-600
                        text-white font-semibold text-sm
                        rounded-xl
                        shadow-lg shadow-indigo-500/30
                        hover:shadow-xl hover:shadow-indigo-500/40
                        hover:from-indigo-700 hover:to-violet-700
                        transition-all duration-200
                        cursor-pointer
                    "
                    >
                    Edit Profile
                    </button>
                </div>}
            </form>
        </div>
    </div>
    </>
}

export default Settings