import { Link } from "react-router-dom";
import AllItemsDisplay from "../../components/AllItemsDisplay"
import { useState, useEffect } from "react";

export const headings = [
  "Provider",
  "NPI",
  "Specialty"
]

const AllProviders = () => {
  const [data, setData] = useState([]);
  const url = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}providers`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.providers);
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
  }, []);



  return (
    <div className="pt-24 px-5">
    <AllItemsDisplay headings={headings}/>

    {data.map(({ _id, firstName, lastName, npiNumber, specialty  }) => {
        return (
          <div key={_id} className="text-center list-none py-2 text-xl font-bold">
            <div className="grid grid-cols-3 hover:bg-blue-400">
            <Link to={`/provider/${_id}`}>{lastName}, {firstName}</Link>
            <Link to="/">{npiNumber}</Link>
            <Link to="/">{specialty}</Link>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default AllProviders