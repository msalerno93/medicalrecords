import { FaBars, FaTimes, FaNotesMedical, FaHome } from "react-icons/fa";
import { FaPeopleGroup, FaUserDoctor, FaFileMedical } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  const navLinks = [
    { id: 1, name: <FaPeopleGroup/>, link: "patients", title: "All Patients" },
    { id: 3, name: <FaUserDoctor/>, link: "providers", title: "All Providers" },
    { id: 4, name: <FaFileMedical/>, link: "insurances", title: "All Insurances" },
    { id: 5, name: <FaHome/>, link: "/", title: "Home" },
    { id: 6, name: <MdAccountCircle/>, link: "/", title: "My Account" },

  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-slate-800 fixed bg-blue-700">
      <div>
        <h1 className="flex text-5xl font-signature font-bold ml-2">
          <Link to="/">
          MedRex EHR
          </Link>
          <FaNotesMedical className="pl-2" />
        </h1>
      </div>
      <ul className="hidden md:flex">
        {navLinks.map(({ name, id, link, title }) => {
            return (
              <li
              title={title}
                key={id}
                className="px-6 cursor-pointer capitalize font-bold text-4xl text-slate-900 hover:text-slate-200"
              >
                <Link to={link} duration={500}>{name}</Link>
              </li>       
        )})}
      </ul>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-black md:hidden"
      >
        {nav ? <FaTimes size={30} className="text-slate-900 hover:text-slate-200" /> : <FaBars size={30} className="text-slate-900 hover:text-slate-200" />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-blue-400 to-blue-300 hover:text-slate-200">
          {navLinks.map(({ id, name, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl text-slate-900 hover:text-slate-200"
            >
              <Link
                onClick={() => setNav(!nav)}
                to={link}
                duration={500}
              >
                <Link onClick={() => setNav(!nav)} to={link} duration={500}>{name}</Link>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;


// export default function NavBar() {
//   return (
//       <nav className="bg-blue-700 p-4 flex items-center justify-between">
//           <h1 className="text-white text-2xl font-bold">Medical App</h1>
//           <div className="hidden md:flex space-x-4">
//               <a href="#" className="text-white hover:text-blue-200">Home</a>
//               <a href="#" className="text-white hover:text-blue-200">Patients</a>
//               <a href="#" className="text-white hover:text-blue-200">Providers</a>
//           </div>
//       </nav>
//   )
// }