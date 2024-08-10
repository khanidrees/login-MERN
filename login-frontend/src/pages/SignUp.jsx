import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {axiosInstance} from '../apicalls/index';
import toast from 'react-hot-toast';


const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    });
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]:value
        }));
    }
    const handleKeyUp = (e)=>{
        let uppercaseRegex = /[A-Z]/g;
        let passwordInput=e.target;
        var passwordMessageItems = document.getElementsByClassName("password-message-item");
    if (passwordInput.value.match(uppercaseRegex)) {
        passwordMessageItems[1].classList.remove("invalid");
        passwordMessageItems[1].classList.add("valid");
    } else {
        passwordMessageItems[1].classList.remove("valid");
        passwordMessageItems[1].classList.add("invalid");
    }

    // checking lowercase letters
    let lowercaseRegex = /[a-z]/g;
    if (passwordInput.value.match(lowercaseRegex)) {
        passwordMessageItems[0].classList.remove("invalid");
        passwordMessageItems[0].classList.add("valid");
    } else {
        passwordMessageItems[0].classList.remove("valid");
        passwordMessageItems[0].classList.add("invalid");
    }

    // checking the number
    let numbersRegex = /[0-9]/g;
    if (passwordInput.value.match(numbersRegex)) {
        passwordMessageItems[2].classList.remove("invalid");
        passwordMessageItems[2].classList.add("valid");
    } else {
        passwordMessageItems[2].classList.remove("valid");
        passwordMessageItems[2].classList.add("invalid");
    }
    //checking special char
    let specialRegex = /[@#$%^&+=*()]/g;
    if (passwordInput.value.match(specialRegex)) {
        passwordMessageItems[3].classList.remove("invalid");
        passwordMessageItems[3].classList.add("valid");
    } else {
        passwordMessageItems[3].classList.remove("valid");
        passwordMessageItems[3].classList.add("invalid");
    }

    // Checking length of the password
    if (passwordInput.value.length >= 7) {
        passwordMessageItems[4].classList.remove("invalid");
        passwordMessageItems[4].classList.add("valid");
    } else {
        passwordMessageItems[4].classList.remove("valid");
        passwordMessageItems[4].classList.add("invalid");
    }
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        
        if(formData?.name?.length<5 || !formData?.email || formData?.password?.length<7){
            return toast.error('pls fill the whole form');
        }

        try {
            const url = import.meta.env.VITE_API_URL+'/users/register';
            console.log(url);
            const result =await axiosInstance.post(url,formData);
            console.log(result); 
            if(result.status==200){
                toast.success('you are registered successfully.');
                navigate('/signin');
            }
               
        } catch (error) {
            toast.error('error while login'+error);
        }
         

    }

  return (
    <div className='min-w-[200px] flex flex-col h-full w-full justify-center items-center'>
        <div className="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Sign Up
            </h4>
            <form 
            className="max-w-screen-lg mt-4 mb-2 w-80 sm:w-96"
            onSubmit={submitHandler}
            >
                <div className="flex flex-col gap-6 mb-1">
                <h6
                    className="block self-start -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Your Name
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                    <input placeholder="name"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    name='name'
                    value={formData.name}
                    required={true}
                    onChange={handleChange}
                    />
                    <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>
                <h6
                    className="block self-start -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Your Email
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                    <input placeholder="name@mail.com"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                    name='email'
                    value={formData.email}
                    required={true}
                    onChange={handleChange}
                    />
                    <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>
                <h6
                    className="block self-start -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Password
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                    <input type="password" 
                    pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$'
                    placeholder="********"
                    className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    name='password'
                    value={formData.password}
                    required={true}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    />
                    <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>
                <div  className="flex flex-col justify-center items-start" >
                    <h4>Password must contain:</h4>
                    <p className="password-message-item invalid">At least
                        <b> one lowercase letter</b>
                    </p>
                    <p className="password-message-item invalid">At least
                        <b> one uppercase letter</b>
                    </p>
                    <p className="password-message-item invalid">At least
                        <b> one number</b>
                    </p>
                    <p className="password-message-item invalid">At least 
                        <b> one special character</b>
                    </p>
                    <p className="password-message-item invalid">Minimum
                        <b> 7 characters</b>
                    </p>
                </div>
                </div>
                
                <input
                className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                title='Sign up'
                
                />
                
                <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
                Already have an account?
                <Link to={'/signin'}>
                    <p className="font-medium text-gray-900">
                        Sign In
                    </p>
                </Link>
                </p>
            </form>
        </div>
    </div>    
  )
};

export default SignUp;
