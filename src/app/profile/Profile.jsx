"use client"

import { AddNote } from '../../components/AddNote';
import RecordEditor from '../../components/RecordEditor';
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import defaultAvatar from "../../app/assets/img/avatar-svgrepo-com.svg" 

const Profile = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAvatar = sessionStorage.getItem('avatar');
      if (storedAvatar) {
        setAvatar(storedAvatar);
      }
    }
  }, []);

  const records = useSelector((state) => state.records);

  const [editingRecord, setEditingRecord] = useState(null);

  const [openRecords, setOpenRecords] = useState({});

  const [description, setDescription] = useState('');

  const handleToggleDescription = useCallback((record) => {
    setOpenRecords((prevOpenRecords) => ({
      ...prevOpenRecords,
      [record.id]: !prevOpenRecords[record.id]
    }))
  },[])

  const addRecord = useCallback((record) => {
    dispatch({ type: "ADD_RECORD", record: { ...record, id: uuidv4() } });
    dispatch({ type: "UPDATE_RECORDS", records: [...records, { ...record, id: uuidv4() }] });
  },[dispatch]);

  const editRecord = useCallback((record) => {
    dispatch({ type: "EDIT_RECORD", record });
  },[])

  const handleEditRecord = useCallback((record) => {
    setEditingRecord(record);
  },[]);

  const handleSaveChanges = useCallback((record) => {
    editRecord(record);
    setEditingRecord(null);
  },[]);

  const handleCancelEdit = useCallback(() => {
    setEditingRecord(null);
  },[]);

  const handleDeleat = useCallback((record) => {
    dispatch({ type: "REMOVE_RECORD", id: record.id })
  },[dispatch]);

  const handleAddDescription = useCallback((record) => {
    editRecord({ ...record, description: description });
    setDescription('');
    setOpenRecords((prevOpenRecords) => ({ ...prevOpenRecords, [record.id]: true }));
  },[]);

  const handleAvatarUpload = useCallback((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const avatar = reader.result;
      setAvatar(avatar);
      dispatch({ type: "UPDATE_USER_AVATAR", avatar });
    };
    reader.readAsDataURL(file);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="bg-white shadow-md rounded p-4">
        <h1 className="text-3xl font-bold mb-4">
          Профиль
        </h1>
        <p className="text-lg mb-2"> <b> Пользователь:</b> <span className="cursor-default hover:text-blue-600 transition duration-300 ease-in-out">{user && user.username}  </span> </p>
        <p className="text-lg mb-4"> <b>Почта: </b>  <span className="cursor-default hover:text-blue-600 transition duration-300 ease-in-out"> {user && user.email}</span> </p>
        <div style={{position:"relative",left: "381px",  top: "-132px"}}>
          <label >
        <Image src={avatar ? avatar : defaultAvatar} alt="avatar" className="w-20 h-20 rounded-full" width={200} height={200} objectFit="cover" />
          <input type="file" onChange={handleAvatarUpload} />
          </label>
        </div>
        <h2 className="text-2xl font-bold mb-4">Заметки</h2>
        <AddNote addRecord={addRecord} />
        <ul className="list-none mb-4">
          {records.map((record) => (
            <div key={record.id} className="mt-5 bg-white shadow-md rounded px-4 py-2 w-300px h-200px">
              {editingRecord && editingRecord.id === record.id ? (
                <RecordEditor
                  record={record}
                  onSave={handleSaveChanges}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div className=" mt- items-center">
                  <span className="cursor-pointer flex justify-between items-center mb-2" onClick={() => handleToggleDescription(record)}>
                    <h3 className='text-lg font-bold'>
                      {record.title}
                    </h3>
                  </span>
                  <hr className="border-gray-200 mb-2" />
                  {
                    openRecords[record.id] && (
                      <div>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Введите описание"
                          className="w-full h-20 p-2 mb-2 border border-gray-300 rounded"
                        />
                        <button
                          onClick={() => handleAddDescription(record)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Сохранить описание
                        </button>
                      </div>
                    )
                  }
                  <div className="text-gray-600">{record.description}</div>
                  <div className="flex items-center mt-1 -top-70px left-55px relative">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleat(record)} ><FaRegTrashAlt /></button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEditRecord(record)}>
                      <MdOutlineEdit />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile