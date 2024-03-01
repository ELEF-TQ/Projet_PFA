import React, { ChangeEvent, useEffect, useState } from "react";
import { getPompistes, createPompiste } from "../../../context/features/PompisteSlice";
import { useDispatch , useSelector } from "react-redux";
import { AppDispatch } from "../../../context/store";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddPompiste: React.FC<Props> = ({ show, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const initialFormData = {
    username: "",
    matriculeRH: "",
    CIN: "",
    phone: "",
    email: "",
    password:"",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!show) {
      setFormData(initialFormData);
    }
  }, [show]);

  const handleSubmit = () => {
    console.log("Submit", formData);
    dispatch(createPompiste(formData)).then(() => {
      handleClose();
      dispatch(getPompistes());
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Check if any field is empty
  const isAnyFieldEmpty = Object.entries(formData).some(([key, value]) => {
    if (key === 'email') { return false } return value === ''});
  
  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Ajouter un nouveau Pompiste</h3>
            </div>
            <div className="modal-content">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Nom
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="Input__Style w-full"
                  placeholder="nom"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="matriculeRH"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Matricule
                </label>
                <input
                  type="text"
                  name="matriculeRH"
                  id="matriculeRH"
                  className="Input__Style w-full"
                  placeholder="#7815"
                  value={formData.matriculeRH}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="CIN"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  CIN
                </label>
                <input
                  type="text"
                  name="CIN"
                  id="CIN"
                  className="Input__Style w-full"
                  placeholder="JC785"
                  value={formData.CIN}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Telephone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="Input__Style w-full"
                  placeholder="0666666"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="Input__Style w-full"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="Input__Style w-full"
                  placeholder="*******"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className={`btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded ${isAnyFieldEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isAnyFieldEmpty} // Disable button if any field is empty
              >
                Ajouter
              </button>
              <button
                className="btn bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={handleClose}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPompiste;
