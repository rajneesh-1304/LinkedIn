'use client'
import { useState } from "react";
import "./modal.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import EducationModal from "../EducationModal/EducationModal";
import ExperienceModal from "../ExperienceModal/ExperienceModal";

export const Modal = ({ close }: any) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modal: string) => {
    setActiveModal(modal); 
  };

  const closeAll = () => {
    setActiveModal(null);   
    close();         
  };

  return (
    <>
      {activeModal === null && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add to your profile</h3>
              <p>Choose what you want to add</p>
            </div>

            <div className="modal-buttons">
              <button className="primary-bttn" onClick={() => openModal("profile")}>
                Update Profile
              </button>

              <button className="secondary-bttn" onClick={() => openModal("education")}>
                Add Education
              </button>

              <button className="secondary-bttn" onClick={() => openModal("experience")}>
                Add Experience
              </button>

              <button className="secondary-bttn" onClick={() => openModal("projects")}>
                Add Projects
              </button>

              <button className="secondary-bttn" onClick={closeAll}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === "profile" && (
        <ProfileModal
          close={() => setActiveModal(null)}
        />
      )}

      {activeModal === "education" && (
        <EducationModal
          close={() => setActiveModal(null)}
        />
      )}

      {activeModal === "experience" && (
        <ExperienceModal
          close={() => setActiveModal(null)}
        />
      )}

      {activeModal === "projects" && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Add Projects</h2>
            <button onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};