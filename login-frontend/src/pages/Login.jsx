import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../apicalls';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    const submitHandler = async(e)=>{
        e.preventDefault();
        
        if( !formData?.email || !formData?.password){
            return toast.error('pls fill the whole form');
        }

        try {
            const url = import.meta.env.VITE_API_URL+'/users/login';
            console.log(url);
            const result =await axiosInstance.post(url,formData);
            console.log(result); 
            localStorage.setItem('token',result?.data?.token)
            if(result?.status==200){
                toast.success('you are logged in successfully.');
                navigate('/');
            }
               
        } catch (error) {
            toast.error('error while login'+error);
        }
         

    }
  return (
    <div className='min-w-[200px] flex flex-col h-full w-full justify-center items-center'>
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 h-full rounded-xl bg-clip-border">
            <div
                className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                Sign In
                </h3>
            </div>
            <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-4 p-6">
                
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
                    />
                    <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>
                <div className="-ml-2.5">
                
                </div>
            </div>
            <div className="p-6 pt-0">
                <button
                className="block w-full select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
                // onSubmit={submitHandler}
                >
                Sign In
                </button>
                <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                Don't have an account?
                <Link to={'/signup'}>
                    <a href="#signup"
                        className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                        Sign up
                    </a>
                </Link>
                </p>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Login;