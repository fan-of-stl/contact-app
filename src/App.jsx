import React, { useEffect, useState } from "react";
import Navabar from "./components/Navabar";
import { CiSearch } from "react-icons/ci";
import { AiTwotonePlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase.config";
import ContactCard from "./components/ContactCard";
import AddOrUpdate from "./components/AddOrUpdate";
import useModal from "./hooks/useModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useModal();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {}
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navabar />

        <div className="flex gap-2">
          <div className="flex relative flex-grow">
            <CiSearch className="absolute text-white text-3xl m-2 justify-center" />
            <input
              type="text"
              onChange={filterContacts}
              className="flex-grow h-10 border bg-transparent border-white pl-10 rounded-md text-white my-1"
            />
          </div>
          <div>
            <AiTwotonePlusCircle
              onClick={onOpen}
              className="text-5xl text-white cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddOrUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
