import { useEffect, useState } from "react";
import AllItemsDisplay from "../../components/AllItemsDisplay";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

export const headings = [
  "Carrier",
  "Phone Number",
  "Address"
]


const AllInsurances = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false)


  const url = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}insurances`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.insurances);
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
  }, []);


  return (
    <div className="pt-28 px-5">
      <AllItemsDisplay headings={headings} />

      {data.map(({ _id, name, phoneNumber, street  }) => {
        return (
          <div key={_id} className="text-center list-none py-2 text-xl font-bold">
            <div className="grid grid-cols-3 hover:bg-blue-400">
            <button onClick={() => setIsModalOpen(true)}>{name}</button>
            <button onClick={() => setIsModalOpen(true)}>{phoneNumber}</button>
            <button onClick={() => setIsModalOpen(true)}>{street}</button>
            </div>
          </div>
        );
      })}

<Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

{/* {!isEdit ? <p>Hello</p> : <input value="Hello"></input>}
      <button onClick={() =>  setIsEdit(!isEdit)}>Editable</button> */}
    </div>
  )
}

export default AllInsurances