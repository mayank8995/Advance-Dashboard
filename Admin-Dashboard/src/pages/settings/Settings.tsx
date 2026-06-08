import { useRef } from "react";
import FormField from "../../components/Form/FormField"
import { className, SIDE_BAR_ITEMS } from "../../utils/constants"
import type { ProfileForm } from "../../types/types";
import { postSubmitProfileSettings } from "../../api/MockApi/MockApi";

function Settings(){

     const formValuesRef = useRef<ProfileForm>({name: '',phone: '',email: '',department: '',designation: '',id:'',jdate:new Date(),wmode:'',location:''} as ProfileForm);
   function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log("onchange data", name, value);
    if (formValuesRef.current && name in formValuesRef.current) {
        formValuesRef.current[name as keyof ProfileForm] = value as any;
    }
}

   const handleSubmit = async (e:any) => {
    e.preventDefault();

    console.log("START SUBMIT");

    try {
        const res = await postSubmitProfileSettings(formValuesRef.current);

        console.log("POST SUCCESS", res);
    } catch(err) {
        console.error("POST FAILED", err);
    }

    console.log("END SUBMIT");
};

    function onCancel(e:any){
        if(window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")){
            formValuesRef.current = {name: '',phone: '',email: '',department: '',designation: '',id:'',jdate:new Date(),wmode:'',location:''} as ProfileForm;
        }
    }

    function handleUpload(){
        const fileInput = document.getElementById("real-file") as HTMLInputElement;
        console.log("fileInput>>>", fileInput);
        if(fileInput){
            fileInput.click();
        }
    }
function handleFileChange(e:any){
    const file = e.target.files[0];
    console.log("Selected file:", file);
    // Here you can implement the logic to upload the file to the server or update the state with the new avatar URL
}
    return <>
    <div className="w-full">
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">{SIDE_BAR_ITEMS.SETTINGS}</h1>
            </div>
            <form onSubmit = {handleSubmit} className="border-2 border-dotted border-gray-300 p-2" noValidate>
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
    src={'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'}
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
  <input  onChange={handleFileChange} type="file" id="real-file" style={{display: "none"}} />
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
                    <FormField name={"name"} type={"text"} placeholder={"Enter your name"} onChange={onChange} className={className}/>
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
                    <FormField name={"phone"} type={"text"} placeholder={"Enter your phone number"} onChange={onChange} className={className} />
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
                    <FormField name={"email"} type={"email"} placeholder={"Enter your email"} onChange={onChange} className={className} />
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

                    <FormField name={"department"} type={"text"} placeholder={"Enter your department"} onChange={onChange} className={className} />
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

                    <FormField name={"designation"} type={"text"} placeholder={"Enter your designation"} onChange={onChange} className={className} />
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

                    <FormField name={"id"} type={"text"} placeholder={"Enter your ID"} onChange={onChange} className={className} />
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

                    <FormField name={"jdate"} type={"date"} placeholder={"Enter your joining date"} onChange={onChange} className={className} />
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

                    <FormField name={"wmode"} type={"text"} placeholder={"Enter your work mode"} onChange={onChange} className={className} />
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

                    <FormField name={"location"} type={"text"} placeholder={"Enter your location"} onChange={onChange} className={className} />
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
                <div className="flex justify-between items-center p-4">
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
                    Save Changes
                    </button>
{/* <button type="button"
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
</button> */}
                </div>
            </form>
        </div>
    </div>
    </>
}

export default Settings