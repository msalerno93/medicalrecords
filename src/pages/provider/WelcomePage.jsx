import { FaPeopleGroup, FaUserDoctor, FaFileMedical } from "react-icons/fa6";
import { Link } from "react-router-dom";

const welcomeLinks = [
  { id: 1, link: "/patients", icon: <FaPeopleGroup />, name: "Patients" },
  { id: 2, link: "/providers", icon: <FaUserDoctor />, name: "Providers" },
  { id: 3, link: "/insurances", icon: <FaFileMedical />, name: "Insurances" },
];

const WelcomePage = () => {
  return (
    <div className="pt-28 text-center">
<div className="text-5xl">Welcome To MedRexEHR!</div>
      <div className="grid grid-cols-3 text-center text-8xl px-20">
        {welcomeLinks.map(({ id, link, icon, name }) => {
          return (
            <Link
              key={id}
              to={link}
              className="flex bg-blue-400 hover:bg-blue-500 items-center rounded-full m-10 p-10"
            >
              <div className="text-center">{icon}</div>
              <div className="text-4xl pl-4">{name}</div>
            </Link>
          );
        })}
      </div>

      {/* <div className='grid grid-cols-3 text-8xl px-10'>
        <FaPeopleGroup className="bg-blue-400 hover:bg-blue-500 rounded-full p-2" />
        <FaUserDoctor />
        <FaFileMedical />
        </div> */}
    </div>
  );
};

export default WelcomePage;
