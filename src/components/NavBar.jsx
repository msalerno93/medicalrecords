import { FaBars, FaTimes, FaNotesMedical } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const navLinks = [
    { id: 1, name: "Patients", link: "patients" },
    { id: 3, name: "Providers", link: "providers" },
    { id: 4, name: "Insurances", link: "insurances" },
    // { id: 5, name: "Contact", link: "contact" },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-slate-900 fixed bg-blue-400">
      <div>
        <h1 className="flex text-5xl font-signature font-bold ml-2">
          <Link to="/">
          MedRex EHR
          </Link>
          <FaNotesMedical className="pl-2" />
        </h1>
      </div>
      <ul className="hidden md:flex">
        {navLinks.map(({ name, id, link }) => {
          return (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize font-bold text-2xl text-slate-900 hover:text-slate-200"
            >
              <Link to={link} duration={500}>{name}</Link>
            </li>
          );
        })}
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