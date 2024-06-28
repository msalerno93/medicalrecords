import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const ProviderShowModal = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editProvider, setEditProvider] = useState([]);
  const navigate = useNavigate();

  const url = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const fetchSingleData = async () => {
    try {
      const response = await fetch(`${url}provider/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setData(result.provider);
      setEditProvider(result.provider);
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    fetchSingleData();
  }, []);

  const updateProvider = (e) => {
    e.preventDefault();
    fetch(`${url}provider/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProvider),
    })
      .then((response) => {
        return response.json();
      })
      .then(setIsModalOpen(false))
      .then(
        setTimeout(() => {
          navigate(`/provider/${id}`);
          fetchSingleData();
        }, 500)
      )
      .catch((e) => console.log(e));
  };

  const deleteProvider = () => {
    fetch(`${url}provider/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        navigate("/providers");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="pt-28 px-5 text-center">
      <div className="text-left">
        <Button>
          <Link to="/providers">Return to Providers</Link>
        </Button>
      </div>
      <h1 className="text-3xl font-bold">
        {data.lastName}, {data.firstName}
      </h1>
      <div className="text-xl">
        <p>Specialty: {data.specialty}</p>
        <p>NPI: {data.npiNumber}</p>
        <p>TaxId: {data.taxIdNumber}</p>
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
            formTitle="Delete Provider"
          >
            <p className="text-2xl pb-10">
              Are you sure you want to delete this Provider?
            </p>
            <p className="text-red-500 text-xl font-bold pb-5">
              {deleteMessage}
            </p>
            <button
              onClick={() => {
                setDeleteMessage("Provider Deleted");
                setTimeout(() => {
                  deleteProvider();
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
            formTitle="Edit Provider"
          >
            <form action="" method="PUT" onSubmit={updateProvider}>
              <div className="grid grid-cols-2">
                <div className="flex p-1 text-lg font-bold">
                  <p>First Name</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        firstName: e.target.value,
                      })
                    }
                    value={editProvider.firstName}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Last Name</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        lastName: e.target.value,
                      })
                    }
                    value={editProvider.lastName}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Street</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        street: e.target.value,
                      })
                    }
                    value={editProvider.street}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>City</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({ ...editProvider, city: e.target.value })
                    }
                    value={editProvider.city}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>State</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        state: e.target.value,
                      })
                    }
                    value={editProvider.state}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Zip</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        zipCode: e.target.value,
                      })
                    }
                    value={editProvider.zipCode}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Phone</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        phoneNumber: e.target.value,
                      })
                    }
                    value={editProvider.phoneNumber}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Fax</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        faxNumber: e.target.value,
                      })
                    }
                    value={editProvider.faxNumber}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Specialty</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        specialty: e.target.value,
                      })
                    }
                    value={editProvider.specialty}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>Tax ID</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        taxIdNumber: e.target.value,
                      })
                    }
                    value={editProvider.taxIdNumber}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
                <div className="flex p-1 text-lg font-bold">
                  <p>NPI</p>{" "}
                  <input
                    onChange={(e) =>
                      setEditProvider({
                        ...editProvider,
                        npiNumber: e.target.value,
                      })
                    }
                    value={editProvider.npiNumber}
                    className="bg-blue-200 ml-2 w-[60%] pl-2"
                    type="text"
                  />
                </div>
              </div>
              <div className="text-center">
                <Button>Edit Provider</Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ProviderShowModal;
