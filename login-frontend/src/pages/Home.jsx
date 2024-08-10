import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-around items-center h-full w-full'>
      <h1>You are logged In</h1>
      <button
      className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      onClick={()=>{
        localStorage.removeItem('token');
        navigate('/signin');
      }}
      >Logout</button>
    </div>
  )
  
}

export default Home