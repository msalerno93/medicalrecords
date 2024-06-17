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

  useEffect(() => {
    fetchSinglePatient();
    fetchPatientNotes()
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
          <h1 className="text-2xl font-bold">Patient Info</h1>
          <p>{data.street}</p>
          <p>{data.city}</p>
          <p>{data.state}</p>
          <p>{data.zipCode}</p>
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-bold">Patient Insurance</h1>
            <p>{data.insuranceName}</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Progress Notes</h1>
        {notes.map((n) => {
          return (
            <p>{n.note}</p>
          )
        })}
      </div>
    </div>
  );
};

export default PatientShowPage;
