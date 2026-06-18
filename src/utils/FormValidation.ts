 export function validateField(name:string, value: any){

    let errorMsg = "";
    if(!/^[a-zA-Z0-9\s-._@\/]*$/.test(value)) errorMsg = "Special characters not allowed." 

    if (name === "name" && value.length < 3) {
      errorMsg = "Username must be at least 3 characters.";
    }
    if (name === "phone" && !/^[(?:\+91|91)?[6-9]\d{9}]*$/.test(value)) {
      errorMsg = "Phone number is invalid";
    }
    if (name === "email" && !/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$/.test(value)) {
      errorMsg = "Invalid email address.";
    }
    if (name === "password" && value.length < 6) {
      errorMsg = "Password must be at least 6 characters.";
    }
    if ((name === "name" || name === "department" || name === "designation" || name === "empId" || name === "jdate") && !value.trim()) {
      errorMsg = `${name} is required!`;
    }
    console.log(name, value)
    return errorMsg;
  };
