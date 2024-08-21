import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContextProvider';
import notFound from '../../assets/notfounddark.png'
import Modal from '../../Components/Modal/Modal';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const Home = () => {
  const { token } = useContext(UserContext);
  const [notes, SetNotes] = useState([]);
  const [updateValues, setUpdateValues] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const updateNote = (id, title, content) => {
    setUpdateValues({ id, title, content });
    setIsUpdate(true);
    setShowModal(true);
  }
  const deleteNote = async (id) => {
    try {
      const { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: {
          token: "3b8ny__" + token
        }
      });
      console.log(data.msg);
      const filteredArray = notes.filter((note) => note._id !== id);
      SetNotes(filteredArray);
    }
    catch (error) {
      console.log(error);
    }
  }
  const getUserNotes = async () => {
    try {
      const { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: "3b8ny__" + token,
        }
      })
      SetNotes(data.notes);
    }
    catch (error) {
      console.log(error.response.data.msg);
    }
  }
  useEffect(() => {
    token && getUserNotes();
  }, [token]);
  return (<>
    <div className="hover:bg-sky-950 duration-300 cursor-pointer absolute top-5 right-5 text-gray-200 rounded px-5 py-3 bg-[#005dcb] flex items-center justify-center">
    </div>
    {notes.length === 0 ? <div className='text-center'>
      <img src={notFound} className='w-1/3 mx-auto' />
      <p className='text-gray-200 p-3 text-2xl'>No Notes Found</p>
    </div>
      :
      <div className='container mx-auto mt-20'>
        <div className="row w-4/5 mx-auto">
          {notes.map((note) => <div key={note._id} className='w-full md:w-1/2 lg:w-1/4 xl:w-1/4 text-white text-center p-4'>
            <div className="inner flex flex-col rounded-lg bg-[#202020] p-6">
              <div className="flex items-center justify-between border-b-2 text-4xl mb-5 flex-col">
                <h2 className='capitalize mb-2'>{note.title}</h2>
                <div className="flex w-full justify-between">
                  <MdDelete className='cursor-pointer' onClick={() => {
                    deleteNote(note._id);
                  }} />
                  <FaEdit className='cursor-pointer' onClick={() => {
                    updateNote(note._id, note.title, note.content);
                  }} />
                </div>
              </div>
              <p className='text-xl'>{note.content}</p>
            </div>
          </div>)}
        </div>
      </div>}
    <Modal setNotes={SetNotes} updateValues={updateValues} isUpdate={isUpdate}
      showModal={showModal} setShowModal={setShowModal} setIsUpdate={setIsUpdate}
    />
  </>
  )
}

export default Home;