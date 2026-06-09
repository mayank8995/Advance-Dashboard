import { useEffect, useRef, useState } from "react";
import FormField from "../../components/Form/FormField"
import { className, SIDE_BAR_ITEMS } from "../../utils/constants"
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
            if(profileData) {
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

    function onCancel(e:any){
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
    <div className="w-full">
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">{SIDE_BAR_ITEMS.SETTINGS}</h1>
            </div>
            <form  onSubmit = {handleSubmit} className="border-2 border-dotted border-gray-300 p-2" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 p-4 gap-4">
                <div>
                    <h1 className="text-xl
                    font-semibold
                    text-slate-800 mb-2">Avatar</h1>
                <div className="flex justify-center items-center gap-4">
                                    <div
                className="
                    relative
                    h-50
                    w-50
                "
                >
  <img
    src={profile_pic ? profile_pic : 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'} // Display the image from localStorage or a placeholder
    alt="Profile"
    className="
      h-full
      w-full
      rounded-full
      object-cover
      border-4
      border-white
      shadow-lg
    "
  />
  <input ref={refForUpload} onChange={handleFileChange} type="file" style={{display: "none"}} />
  <button
  onClick={handleUpload}
  type="button"
    className="
      absolute
      bottom-1
      right-1
      h-10
      w-10
      rounded-full
      bg-blue-600
      text-white
      flex
      items-center
      justify-center
      shadow-md
    "
  >
    ✎
  </button>
                    </div>
</div>
                </div>
                <div>
                    <h2 className="text-xl
font-semibold
text-slate-800 mb-2">Personal Information</h2>
                    <div className="flex flex-col-reverse">
                    <FormField defaultValue={initialData?.name} name={"name"} type={"text"} placeholder={"Enter your name"} onChange={onInputChange} className={className}/>
                        <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Name
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">
                    <FormField defaultValue={initialData?.phone} name={"phone"} type={"text"} placeholder={"Enter your phone number"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Phone Number
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">
                    <FormField defaultValue={initialData?.email} name={"email"} type={"email"} placeholder={"Enter your email"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Email
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.department} name={"department"} type={"text"} placeholder={"Enter your department"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Department
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.designation} name={"designation"} type={"text"} placeholder={"Enter your designation"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Designation
                        </label>
                    </div>
                </div>
            </div>
                <div className="border-t-2  border-gray-300 border-dotted"></div>
                <div className="p-4">
                    <h2 className="text-xl
font-semibold
text-slate-800 mb-2">Account Information</h2>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.empId} name={"empId"} type={"text"} placeholder={"Enter your ID"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Employee ID
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.jdate} name={"jdate"} type={"date"} placeholder={"Enter your joining date"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Joining Date
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.wmode} name={"wmode"} type={"text"} placeholder={"Hybrid/Remote/Onsite"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Work Mode
                        </label>
                    </div>
                    <div className="flex flex-col-reverse">

                    <FormField defaultValue={initialData?.location} name={"location"} type={"text"} placeholder={"Enter your location"} onChange={onInputChange} className={className} />
                    <label
                        className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-600
                        "
                        >
                        Location
                        </label>
                    </div>
                </div>
                <div className="border-t-2  border-gray-300 border-dotted"></div>
                {!isEditing && <div className="flex justify-between items-center p-4">
                    <button type="submit"
                    className="
                        px-5
                        py-3
                        rounded-xl
                        bg-blue-600
                        text-white
                        font-medium
                        shadow-sm
                        hover:bg-blue-700
                        hover:shadow-md
                        transition-all
                        duration-200
                    "
                    >
                    Save Profile
                    </button>
<button type="button"
  className="
    px-5
    py-3
    rounded-xl
    border
    border-slate-300
    bg-white
    text-slate-700
    font-medium
    hover:bg-slate-100
    transition-all
    duration-200
  "
  onClick={onCancel}
>
  Cancel
</button>
                </div>}
                 {isEditing && <div className="flex justify-between items-center p-4">
                    <button type="submit"
                    className="
                        px-5
                        py-3
                        rounded-xl
                        bg-blue-600
                        text-white
                        font-medium
                        shadow-sm
                        hover:bg-blue-700
                        hover:shadow-md
                        transition-all
                        duration-200
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