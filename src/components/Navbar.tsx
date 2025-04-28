import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState("test")
  const navigate = useNavigate();
  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUser(name); 
    }
    else {
      navigate('/sign-in');
    }
  }, [navigate]); 
  
  const handleLogout = ()=>{
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    setUser("");  
    window.location.reload();
  }
  return (
    <>
        <header className="text-gray-600 body-font shadow-lg relative z-50 bg-transparent rent ">
      <div className="mx-auto flex items-center justify-between px-5 py-2 relative">

        <Link to="/" className="flex items-center text-gray-900  md:ml-5">
          <span>Task Manager</span>
        </Link>


        <nav className="hidden md:flex gap-4 text-base items-center ml-auto">
          <h2 className="hover:text-gray-900 -gray-200">{user ? `Welcome ${user}` : ""}</h2>

          {
            !user ?
              <Link to={'/sign-up'}>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base 0 ray-600">
                  Login
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link> :
              <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base 0 ray-600">
                Logout
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
          }
          
        </nav>

        <div className="md:hidden ml-auto z-50">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none ">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-fit w-1/3 bg-white/80 0/80 shadow-lg backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-5 pt-20 flex flex-col gap-4 text-base items-end text-right">
          <h2 className="hover:text-gray-900 -gray-200">{user ? `Welcome ${user}` : ""}</h2>
          {
            !user ?
              <Link to={'/sign-up'}>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base 0 ray-600">
                  Login
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </Link> :
              <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base 0 ray-600">
                Logout
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
          }
          
        </div>
      </div>
    </header>
    </>
  )
}

export default Navbar