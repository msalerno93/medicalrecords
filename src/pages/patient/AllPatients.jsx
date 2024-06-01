import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Button from "../../components/Button";
import { FaHome } from "react-icons/fa";
import AllItemsDisplay from "../../components/AllItemsDisplay";


export const headings = [
  "Name",
  "Birth Date",
  "Insurance"
]

const AllPatients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/patients");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result.patients[0].firstName);
        setData(result.patients);
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
  }, []);


  return (
    <div className="pt-24 px-10 max-w-[100%]">
      <AllItemsDisplay headings={headings}/>

      {data.map(({ firstName, lastName, birthDate, insuranceName }) => {
        return (
          <div className="text-center list-none py-2 text-xl font-bold">
            <div className="grid grid-cols-3 hover:bg-blue-400">
            <Link to="/">{lastName}, {firstName}</Link>
            <Link to="/">{birthDate}</Link>
            <Link to="/">{insuranceName}</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllPatients;
