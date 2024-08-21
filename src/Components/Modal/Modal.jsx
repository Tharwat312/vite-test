import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CiStickyNote } from "react-icons/ci";
import { UserContext } from '../../Context/UserContextProvider'
function Modal({ setNotes, updateValues, isUpdate, setShowModal, showModal, setIsUpdate }) {
    const { token } = useContext(UserContext);    
    const callAPI = async (userInputs) => {
        if (isUpdate === false) {
            //Add a new notes   
            try {
                const { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, userInputs, {
                    headers: {
                        token: "3b8ny__" + token
                    }
                })
                console.log(data);
                setNotes((prevState) => [...prevState, data.note]);
                setTimeout(() => {
                    setShowModal(false);
                }, 1000);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            //Update Note
            try {
                const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${updateValues.id}`, userInputs, {
                    headers: {
                        token: "3b8ny__" + token
                    }
                })
                setNotes((prevState) => prevState.map((note) => note._id === data.note._id ? data.note : note));
                setTimeout(() => {
                    setIsUpdate(false);
                    setShowModal(false);
                }, 1000);
            }   
            catch (error) {
                console.log(error);
                setIsUpdate(false);
            }
        }
    }
    const form = useFormik({
        initialValues: {
            title: isUpdate ? updateValues.title : "",
            content: isUpdate ? updateValues.content : "",
        },
        onSubmit: callAPI,
        enableReinitialize: true,
    })
    return (
        <>
            <button
                className="hover:bg-sky-950 duration-300 cursor-pointer absolute top-5 right-5 text-gray-200 rounded px-5 py-3 bg-[#005dcb] flex items-center justify-center"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <CiStickyNote className='mr-3' />
                Add Note
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <form onSubmit={form.handleSubmit} className="border-0 shadow-lg relative flex flex-col w-full bg-[#171717] rounded outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold text-white capitalize">
                                        {isUpdate ? "update current note" : "add a new note"}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="p-3 flex items-center justify-center">
                                    <label htmlFor="title" className='mr-3 text-white'>Title</label>
                                    <input name="title" id="title"
                                        value={form.values.title}
                                        onChange={form.handleChange}
                                        className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                                    ></input>
                                </div>
                                <div className="p-6 flex items-center justify-center">
                                    <label htmlFor="content" className='mr-3 text-white'>Content</label>
                                    <textarea name="content" id="content"
                                        value={form.values.content}
                                        onChange={form.handleChange}
                                        rows={5}
                                        className='block resize-y w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-[#005dcb] sm:text-sm sm:leading-6'
                                    ></textarea>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        {isUpdate ? "update note" : "add note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default Modal