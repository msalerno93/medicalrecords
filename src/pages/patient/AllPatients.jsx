import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FaHome } from "react-icons/fa";
import AllItemsDisplay from "../../components/AllItemsDisplay";
import Modal from "../../components/Modal";

export const headings = ["Name", "Birth Date", "Insurance"];

const AllPatients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [insuranceName, setInsuranceName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [insurances, setInsurances] = useState([]);

  const navigate = useNavigate();

  const url = process.env.REACT_APP_API_URL;

  const postNewPatient = async (e) => {
    e.preventDefault();
    const patient = {
      firstName,
      lastName,
      birthDate,
      street,
      city,
      state,
      zipCode,
      phoneNumber,
      policyNumber,
      email,
      insuranceName,
    };
    fetch(`${url}addpatient`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    setMessage("Added Patient Successfully!");
    setFirstName("");
    setLastName("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setStreet("");
    setPhoneNumber("");
    setEmail("");
    setInsuranceName("");
    setPolicyNumber("");
    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/patients");
    }, 500);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}patients`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.patients);
      } catch (error) {
        return error.message;
      }
    };

    const fetchInsurances = async () => {
      try {
        const response = await fetch(`${url}insurances`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setInsurances(result.insurances);
        // setId(result.insurances.map((e) => e._id))
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
    fetchInsurances();
  }, [() => postNewPatient()]);

  const addFormInfo = [
    {
      id: 1,
      title: "First Name",
      value: firstName,
      changeValue: setFirstName,
    },
    {
      id: 2,
      title: "Last Name",
      value: lastName,
      changeValue: setLastName,
    },
    {
      id: 3,
      title: "Street",
      value: street,
      changeValue: setStreet,
    },
    {
      id: 4,
      title: "City",
      value: city,
      changeValue: setCity,
    },
    {
      id: 5,
      title: "State",
      value: state,
      changeValue: setState,
    },
    {
      id: 6,
      title: "Zip Code",
      value: zipCode,
      changeValue: setZipCode,
    },
    {
      id: 7,
      title: "Phone Number",
      value: phoneNumber,
      changeValue: setPhoneNumber,
    },
    {
      id: 8,
      title: "Date of Birth",
      value: birthDate,
      changeValue: setBirthDate,
    },
    {
      id: 9,
      title: "Email",
      value: email,
      changeValue: setEmail,
    },
    {
      id: 10,
      title: "Policy Number",
      value: policyNumber,
      changeValue: setPolicyNumber,
    },
    // {
    //   id: 11,
    //   title: "Insurance",
    //   value: insuranceName,
    //   changeValue: setInsuranceName,
    // },
  ];

  return (
    <div className="pt-24 px-10 max-w-[100%]">
      <Button action={() => setIsModalOpen(true)}>Add Patient</Button>

      <AllItemsDisplay headings={headings} />

      <div className="text-center text-xl bg-green-200 font-bold">
        {message}
      </div>

      {data.map(({ _id, firstName, lastName, birthDate, insuranceName }) => {
        return (
          <div
            key={_id}
            className="text-center list-none py-2 text-xl font-bold"
          >
            <div key={_id} className="text-center list-none py-2 text-xl font-bold">
            <Link to={`/patient/${_id}`} className="grid grid-cols-3 hover:bg-blue-400">
            <p>{lastName}, {firstName}</p>
            <p>{birthDate}</p>
            <p>{insuranceName}</p>
            </Link >
          </div>
          </div>
        );
      })}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Add Patient"
      >
        <form action="" method="POST" onSubmit={postNewPatient}>
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
            <select
              value={insuranceName}
              onChange={(e) => {
                setInsuranceName(e.target.value)
              }}
              id="Insurance"
              className="bg-blue-500 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue="Choose Insurance">
                Choose an Insurance
              </option>
              {insurances.map(({ _id, name }) => {
                return (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="text-center">
            <Button>Add Patient</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AllPatients;
