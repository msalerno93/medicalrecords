import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

const PatientShowPage = () => {
  const [data, setData] = useState([]);
  const [editPatient, setEditPatient] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState([]);
  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

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

  useEffect(() => {
    fetchSinglePatient();
    fetchPatientNotes();
  }, []);
  return (
    <div className="pt-20 px-5 text-center">
      <div>
        <div className="text-left pt-0">
          <Button>
            <Link to="/patients">Back to Patients</Link>
          </Button>
        </div>
        <div className="text-right">
          <Button>Edit Patient</Button>
        </div>
      </div>
      <div className="text-left pb-10 font-bold">
        <h1 className="text-3xl">
          {data.lastName}, {data.firstName}
        </h1>
        <p className="text-xl">DOB: {data.birthDate}</p>
        <p className="text-xl">Age: 30</p>
      </div>
      <div className="grid grid-cols-2 pb-10">
        <div>
          <h1 className="text-3xl font-bold">Patient Info</h1>
          {patientInfo.map(({ id, name, display }) => {
            return (
              <p key={id} className="text-xl">
                {name}: {display}
              </p>
            );
          })}
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-bold">Patient Insurance</h1>
            <p>{data.insuranceName}</p>
            <p>{data.policyNumber}</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Progress Notes</h1>
        <div className="grid grid-cols-2 gap-0 mx-10">
          {notes.map((n) => {
            return (
              <div className="py-2">
                <p>{n.note}</p>
                <p>{n.date}</p>
                <p>{n.provider}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientShowPage;
