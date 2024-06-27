import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

const PatientShowPage = () => {
  const [data, setData] = useState([]);
  const [editPatient, setEditPatient] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('')
  // const [notes, setNotes] = useState([]);
  // const [editNote, setEditNote] = useState([]);
  // const [isEditNotes, setIsEditNotes] = useState(false)
  // const [noteId, setNoteId] = useState();

  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  // const editTheNote = (noteId) => {
  //     // console.log(`${url}patient/${id}/notes/${noteId}/edit`);

  //   fetch(`${url}patient/${id}/notes/${noteId}/edit`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(editNote),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(setIsModalOpen(false))
  //     .then(
  //       setTimeout(() => {
  //         navigate(`/patient/${id}`);
  //         fetchSinglePatient();
  //       }, 500)
  //     )
  //     .catch((e) => console.log(e));
  // }
  const fetchInsurances = async () => {
    try {
      const response = await fetch(`${url}insurances`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setInsurance(result.insurances);
      // setId(result.insurances.map((e) => e._id))
    } catch (error) {
      return error.message;
    }
  }
  const fetchSinglePatient = async () => {
    try {
      const response = await fetch(`${url}patient/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.patient);
      console.log(result.patient.notes[1]);
      setEditPatient(result.patient);
    } catch (error) {
      return error.message;
    }
  };

  
  // const fetchPatientNotes = async () => {
  //   try {
  //     const response = await fetch(`${url}patient/${id}/notes`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const result = await response.json();
  //     setNotes(result);
  //     console.log(result.note);
  //   } catch (error) {
  //     return error.message;
  //   }
  // };
  const updatePatient = (e) => {
    e.preventDefault();
    fetch(`${url}patient/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPatient),
    })
      .then((response) => {
        return response.json();
      })
      .then(setIsModalOpen(false))
      .then(setMessage("Changes Completed"))
      .then(
        setTimeout(() => {
          navigate(`/patient/${id}`);
          fetchSinglePatient();
        }, 500)
      )
      .then(
        setTimeout(() => {
          setMessage('')
        }, 1000)
      )
      .catch((e) => console.log(e));
  };
  const patientInfo = [
    {
      id: 1,
      name: "Street",
      display: data.street,
    },
    {
      id: 2,
      name: "City",
      display: data.city,
    },
    {
      id: 3,
      name: "State",
      display: data.state,
    },
    {
      id: 4,
      name: "Zip Code",
      display: data.zipCode,
    },
  ];

  const patientContact = [
    {
      id: 5,
      name: "Phone",
      display: data.phoneNumber,
    },
    {
      id: 6,
      name: "Email",
      display: data.email,
    },
  ];

  useEffect(() => {
    fetchSinglePatient();
    fetchInsurances()
    // fetchPatientNotes();
  }, []);


  return (
    <div className="pt-20 pb-5 px-5 text-center">
      <div>
        <div className="text-left pt-0">
          <Button>
            <Link to="/patients">Back to Patients</Link>
          </Button>
        </div>
        <div className="text-right">
          <button
            onClick={() => {
              setIsModalOpen(true)}}
            className="text-2xl font-bold mb-2 bg-blue-400 rounded-3xl px-3 py-1 hover:bg-blue-500"
          >
            Edit Patient
          </button>
        </div>
      </div>
      <div className="text-center text-xl bg-green-200 font-bold">
        {message}
      </div>
      <div className="text-left pb-10 font-bold">
        <h1 className="text-5xl">
          {data.lastName}, {data.firstName}
        </h1>
        <p className="text-2xl">DOB: {data.birthDate}</p>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div>
          <h1 className="text-3xl font-bold">Patient Information</h1>
          <div className="grid grid-cols-2 pt-5">
            <div>
              <div className="text-2xl font-bold">Address Info</div>
              {patientInfo.map(({ id, name, display }) => {
                return (
                  <p key={id} className="text-xl">
                    {name}: {display}
                  </p>
                );
              })}
            </div>
            <div>
              <div className="text-2xl font-bold">Contact Info</div>
              {patientContact.map(({ id, name, display }) => {
                return (
                  <p key={id} className="text-xl">
                    {name}: {display}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-bold pb-5">Patient Insurance</h1>
            <p className="text-xl">Insurance: {data.insuranceName}</p>
            <p className="text-xl">Policy: {data.policyNumber}</p>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formTitle="Edit Patient"
        >
          <form action="" method="PUT" onSubmit={updatePatient}>
            <div className="grid grid-cols-2">
              <div className="flex p-1 text-lg font-bold">
                <p>First Name</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      firstName: e.target.value,
                    })
                  }
                  value={editPatient.firstName}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Last Name</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      lastName: e.target.value,
                    })
                  }
                  value={editPatient.lastName}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>DOB</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      birthDate: e.target.value,
                    })
                  }
                  value={editPatient.birthDate}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Street</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      street: e.target.value,
                    })
                  }
                  value={editPatient.street}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>City</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({ ...editPatient, city: e.target.value })
                  }
                  value={editPatient.city}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>State</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      state: e.target.value,
                    })
                  }
                  value={editPatient.state}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Zip</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      zipCode: e.target.value,
                    })
                  }
                  value={editPatient.zipCode}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Phone</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      phoneNumber: e.target.value,
                    })
                  }
                  value={editPatient.phoneNumber}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Email</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      email: e.target.value,
                    })
                  }
                  value={editPatient.email}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Policy</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      policyNumber: e.target.value,
                    })
                  }
                  value={editPatient.policyNumber}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
              <select
              value={editPatient.insuranceName}
              onChange={(e) => {
                setEditPatient({
                  ...editPatient,
                  insuranceName: e.target.value})
              }}
              id="Insurance"
              className="bg-blue-500 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue="Choose Insurance">
                Choose an Insurance
              </option>
              {insurance.map(({ _id, name }) => {
                return (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
              </div>
            </div>
            <div className="text-center">
              <Button>Edit Patient</Button>
            </div>
          </form>
        </Modal>
      </div>
      {/* <div className="text-center">
        <div className="">
          <h1 className="text-3xl font-bold pb-2">Progress Notes</h1>
          <div className="pb-5">
            <button className="text-xl font-bold bg-blue-400 rounded-xl px-2 hover:bg-blue-500">
              Add Note
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0 mx-10 text-left">
          {notes.map(({note, date, provider, _id}) => {
            return (
              <div key={_id} className="py-10 px-5 shadow-md shadow-blue-900">
                <p className="text-xl">Progress Note: {note}</p>
                <p className="text-xl">Date: {date}</p>
                <p className="text-xl pb-1">Provider: {provider}</p>
                <button onClick={() => {
                  setNoteId(_id)
                  setIsEditNotes(true)
                  setIsModalOpen(true)
                  console.log(editPatient.notes.provider);
                }} className="text-xl font-bold bg-blue-400 rounded-xl px-2 hover:bg-blue-500">
                  Edit
                </button>
                <div key={_id}>
                {isEditNotes ?
        <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formTitle="Edit Patient"
      >
        <form action="" method="PUT">
          <div className="grid grid-cols-2">
            <div className="flex p-1 text-lg font-bold">
              <p>Provider</p>{" "}
              <input
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    provider: e.target.value,
                  })
                }
                value={provider}
                className="bg-blue-200 ml-2 w-[60%] pl-2"
                type="text"
              />
            </div>
            <div className="flex p-1 text-lg font-bold">
              <p>Date</p>{" "}
              <input
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    date: e.target.value,
                  })
                }
                value={date}
                className="bg-blue-200 ml-2 w-[60%] pl-2"
                type="text"
              />
            </div>
          </div>
          <div className="align-center">
            <div className="flex p-1 text-lg font-bold">
              <p>Note</p>{" "}
              <textarea
                onChange={(e) =>
                  setEditNote({
                    ...editNote,
                    note: e.target.value,
                  })
                }
                value={editPatient.notes.note}
                className="bg-blue-200 ml-2 w-[80%] min-h-48 pl-2"
                type="textarea"
              />
            </div>
            </div>
          <div className="text-center">
            <Button onClick={() => {
              editTheNote(noteId)
            }}>Edit Patient</Button>
          </div>
        </form>
      </Modal> :
      <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formTitle="Edit Patient"
        >
          <form action="" method="PUT" onSubmit={updatePatient}>
            <div className="grid grid-cols-2">
              <div className="flex p-1 text-lg font-bold">
                <p>First Name</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      firstName: e.target.value,
                    })
                  }
                  value={editPatient.firstName}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Last Name</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      lastName: e.target.value,
                    })
                  }
                  value={editPatient.lastName}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>DOB</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      birthDate: e.target.value,
                    })
                  }
                  value={editPatient.birthDate}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Street</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      street: e.target.value,
                    })
                  }
                  value={editPatient.street}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>City</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({ ...editPatient, city: e.target.value })
                  }
                  value={editPatient.city}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>State</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      state: e.target.value,
                    })
                  }
                  value={editPatient.state}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Zip</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      zipCode: e.target.value,
                    })
                  }
                  value={editPatient.zipCode}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Phone</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      phoneNumber: e.target.value,
                    })
                  }
                  value={editPatient.phoneNumber}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Email</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      email: e.target.value,
                    })
                  }
                  value={editPatient.email}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Policy</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      policyNumber: e.target.value,
                    })
                  }
                  value={editPatient.policyNumber}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
              <div className="flex p-1 text-lg font-bold">
                <p>Insurance</p>{" "}
                <input
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      insuranceName: e.target.value,
                    })
                  }
                  value={editPatient.insuranceName}
                  className="bg-blue-200 ml-2 w-[60%] pl-2"
                  type="text"
                />
              </div>
            </div>
            <div className="text-center">
              <Button>Edit Patient</Button>
            </div>
          </form>
        </Modal>
      }
                </div>

                
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default PatientShowPage;
