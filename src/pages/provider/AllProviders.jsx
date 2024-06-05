import { Link, useNavigate } from "react-router-dom";
import AllItemsDisplay from "../../components/AllItemsDisplay"
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

export const headings = [
  "Provider",
  "NPI",
  "Specialty"
]

const AllProviders = () => {
  const [data, setData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const [taxIdNumber, setTaxIdNumber] = useState("");
  const [specialty, setSpecialty] = useState("")
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
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
  }, [() => postNewProvider()]);

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
      title: "Fax Number",
      value: faxNumber,
      changeValue: setFaxNumber,
    },
    {
      id: 9,
      title: "NPI",
      value: npiNumber,
      changeValue: setNpiNumber,
    },
    {
      id: 10,
      title: "Tax ID",
      value: taxIdNumber,
      changeValue: setTaxIdNumber,
    },
    {
      id: 11,
      title: "Specialty",
      value: specialty,
      changeValue: setSpecialty
    }
  ];

  const postNewProvider = async (e) => {
    e.preventDefault();
    const provider = {
      firstName,
      lastName,
      street,
      city,
      state,
      zipCode,
      phoneNumber,
      faxNumber,
      taxIdNumber,
      npiNumber,
      specialty
    };
    fetch(`${url}addprovider`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(provider),
    });
    setMessage("Added Provider Successfully!");
    setFirstName("");
    setLastName("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setStreet("");
    setPhoneNumber("");
    setFaxNumber("");
    setNpiNumber("")
    setTaxIdNumber("");
    setSpecialty("")
    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/providers");
    }, 500);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };


  return (
    <div className="pt-24 px-5">
      <Button action={() => setIsModalOpen(true)}>Add Provider</Button>
      <h1 className="text-center text-4xl">All Providers</h1>

    <AllItemsDisplay headings={headings}/>

    {data.map(({ _id, firstName, lastName, npiNumber, specialty  }) => {
        return (
          <div key={_id} className="text-center list-none py-2 text-xl font-bold">
            <Link to={`/provider/${_id}`} className="grid grid-cols-3 hover:bg-blue-400">
            <p>{lastName}, {firstName}</p>
            <p>{npiNumber}</p>
            <p>{specialty}</p>
            </Link >
          </div>
        );
      })}

<Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Add Provider"
      >
        <form action="" method="POST" onSubmit={postNewProvider}>
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
            <Button>Add Provider</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AllProviders