import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const InsuranceShowModal = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editInsurance, setEditInsurance] = useState([]);
  const navigate = useNavigate();

  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${url}providers`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       setData(result.providers);
  //     } catch (error) {
  //       return error.message;
  //     }
  //   };

  //   fetchData();
  // }, [() => postNewProvider()]);

    const fetchSingleData = async () => {
      try {
        const response = await fetch(`${url}insurance/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result.insurance);
        setEditInsurance(result.insurance);
      } catch (error) {
        return error.message;
      }
    };

    useEffect(() => {
      fetchSingleData()
    }, [])
  

  const updateInsurance = (e) => {
    e.preventDefault();
    fetch(`${url}insurance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editInsurance),
    })
      .then((response) => {
        return response.json();
      })
      .then(setIsModalOpen(false))
      .then(
        setTimeout(() => {
          navigate(`/insurance/${id}`)
          fetchSingleData()
        }, 500)
      )
      .catch((e) => console.log(e));
  };

  const deleteInsurance = () => {
    fetch(`${url}insurance/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        navigate("/insurances");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="pt-28 px-5 text-center">
      <div className="text-left">
        <Button>
          <Link to="/insurances">Return to Insurances</Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <div className="text-xl">
        <p>{data.street}</p>
        <p>{data.city}</p>
        <p>{data.zipCode}</p>
        <p>{data.phoneNumber}</p>
        <p>{data.faxNumber}</p>
      </div>
      <div className="grid grid-cols-1 m-10">
        <div>
          <button
            onClick={() => {
              setIsDelete(true);
              setIsModalOpen(true);
            }}
            className="text-2xl font-bold mb-2 bg-red-400 rounded-3xl px-3 py-1 hover:bg-red-500"
          >
            Delete
          </button>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-2xl font-bold mb-2 bg-blue-400 rounded-3xl px-3 py-1 hover:bg-blue-500"
          >
            Edit
          </button>
        </div>
        {isDelete ? (
          <Modal
            isOpen={isModalOpen}
            setIsDelete={setIsDelete}
            onClose={() => setIsModalOpen(false)}
            formTitle="Delete Insurance"
          >
            <p className="text-2xl pb-10">
              Are you sure you want to delete this Insurance?
            </p>
            <p className="text-red-500 text-xl font-bold pb-5">
              {deleteMessage}
            </p>
            <button
              onClick={() => {
                setDeleteMessage("Insurance Deleted");
                setTimeout(() => {
                  deleteInsurance();
                }, 1000);
              }}
              className="text-2xl font-bold mb-2 bg-red-400 rounded-3xl px-3 py-1 hover:bg-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setIsDelete(false);
                setIsModalOpen(false);
              }}
              className="text-2xl ml-5 font-bold mb-2 bg-blue-400 rounded-3xl px-3 py-1 hover:bg-blue-500"
            >
              Exit
            </button>
          </Modal>
        ) : (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            formTitle="Edit Insurance"
          >
            <form action="" method="PUT" onSubmit={updateInsurance}>
              <div className="grid grid-cols-2">
                <div className="flex p-1 text-lg font-bold">
                  <p>Name</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        name: e.target.value,
                      })
                    }
                    value={editInsurance.name}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Street</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        street: e.target.value,
                      })
                    }
                    value={editInsurance.street}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>City</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        city: e.target.value,
                      })
                    }
                    value={editInsurance.city}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>State</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        state: e.target.value,
                      })
                    }
                    value={editInsurance.state}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Zip</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        zipCode: e.target.value,
                      })
                    }
                    value={editInsurance.zipCode}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Phone</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        phoneNumber: e.target.value,
                      })
                    }
                    value={editInsurance.phoneNumber}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Fax</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditInsurance({
                        ...editInsurance,
                        faxNumber: e.target.value,
                      })
                    }
                    value={editInsurance.faxNumber}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
              </div>
              <div className="text-center">
                <Button>Edit Insurance</Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default InsuranceShowModal;
