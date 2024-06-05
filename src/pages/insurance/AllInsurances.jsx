import { useCallback, useEffect, useState } from "react";
import AllItemsDisplay from "../../components/AllItemsDisplay";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

export const headings = ["Carrier", "Phone Number", "Address"];
const url = process.env.REACT_APP_API_URL;

const AllInsurances = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const addFormInfo = [
    {
      id: 1,
      title: "Name",
      value: name,
      changeValue: setName,
    },
    {
      id: 2,
      title: "Street",
      value: street,
      changeValue: setStreet,
    },
    {
      id: 3,
      title: "City",
      value: city,
      changeValue: setCity,
    },
    {
      id: 4,
      title: "State",
      value: state,
      changeValue: setState,
    },
    {
      id: 5,
      title: "Zip Code",
      value: zipCode,
      changeValue: setZipCode,
    },
    {
      id: 6,
      title: "Phone Number",
      value: phoneNumber,
      changeValue: setPhoneNumber,
    },
    {
      id: 7,
      title: "Fax Number",
      value: faxNumber,
      changeValue: setFaxNumber,
    },
  ];

  const postNewInsurance = async (e) => {
    e.preventDefault();
    const insurance = {
      name,
      street,
      city,
      state,
      zipCode,
      phoneNumber,
      faxNumber,
    };
    fetch(`${url}addinsurance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(insurance),
    });
    setMessage("Added Insurance Successfully!");
    setName("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setStreet("");
    setPhoneNumber("");
    setFaxNumber("");
    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/insurances");
    }, 500);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}insurances`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.insurances);
        // setId(result.insurances.map((e) => e._id))
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
  }, [() => postNewInsurance()]);

  return (
    <div className="pt-28 pb-10 px-5">
      <Button action={() => setIsModalOpen(true)}>Add Insurance</Button>

      <AllItemsDisplay headings={headings} />
      <div className="text-center text-xl bg-green-100 font-bold">
        {message}
      </div>

      {data.map(({ _id, name, phoneNumber, street }) => {
        return (
          <div
            key={_id}
            className="text-center list-none py-2 text-xl font-bold"
          >
            <div className="grid grid-cols-3 hover:bg-blue-400">
              <button>{name}</button>
              <Link to={`/insurance/${_id}`}>{phoneNumber}</Link>
              <button>{street}</button>
            </div>
          </div>
        );
      })}
      {/* <button onClick={() => console.log(fetchSingleData())}>hi</button> */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Add Insurance"
      >
        <form action="" method="POST" onSubmit={postNewInsurance}>
          <div className="grid grid-cols-2">
            {addFormInfo.map(({ id, title, value, changeValue }) => {
              return (
                <div key={id} className="flex p-1 text-lg font-bold">
                  <p>{title}</p>{" "}
                  <input
                    onChange={(e) => changeValue(e.target.value)}
                    value={value}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Button>Add Insurance</Button>
          </div>
        </form>
      </Modal>

      {/* {!isEdit ? <p>Hello</p> : <input value="Hello"></input>}
      <button onClick={() =>  setIsEdit(!isEdit)}>Editable</button> */}
    </div>
  );
};

export default AllInsurances;
