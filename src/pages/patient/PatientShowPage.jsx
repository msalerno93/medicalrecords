import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

const PatientShowPage = () => {
  const [data, setData] = useState([]);
  const [editPatient, setEditPatient] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const navigate = useNavigate();

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

  const fetchPatientNotes = async () => {
    try {
      const response = await fetch(`${url}patient/${id}/notes`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setNotes(result);
      console.log(result.note);
      setEditNote(result);
    } catch (error) {
      return error.message;
    }
  };
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
      .then(
        setTimeout(() => {
          navigate(`/patient/${id}`);
          fetchSinglePatient();
        }, 500)
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
  ]

  useEffect(() => {
    fetchSinglePatient();
    fetchPatientNotes();
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
            onClick={() => setIsModalOpen(true)}
            className="text-2xl font-bold mb-2 bg-blue-400 rounded-3xl px-3 py-1 hover:bg-blue-500"
          >
            Edit Patient
          </button>
        </div>
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
            <div className="text-2xl font-bold">
                Address Info
              </div>
            {patientInfo.map(({ id, name, display }) => {
            return (
              <p key={id} className="text-xl">
                {name}: {display}
              </p>
            );
          })}
            </div>
            <div>
              <div className="text-2xl font-bold">
                Contact Info
              </div>
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
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold pb-5">Progress Notes</h1>
        <div className="grid grid-cols-3 gap-0 mx-10 text-left">
          {notes.map((n) => {
            return (
              <div className="py-2 pb-5">
                <p className="text-xl">Progress Note: {n.note}</p>
                <p className="text-xl">Date: {n.date}</p>
                <p className="text-xl">Provider: {n.provider}</p>
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formTitle="Edit Provider"
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
      </div>
    </div>
  );
};

export default PatientShowPage;
