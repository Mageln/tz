"use client"

import { AddNote } from '@/components/addNote';

import RecordEditor from '@/components/RecordEditor';
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';


import { FaRegTrashAlt } from "react-icons/fa";
import  {MdOutlineEdit}  from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const records = useSelector((state) => state.records);


  const [editingRecord, setEditingRecord] = useState(null);
  const [recordDescriptions, setRecordDescriptions] = useState({})

  const [openRecords, setOpenRecords] = useState({});

  const handleToggleDescription = (record) => {
    setOpenRecords((prevOpenRecords) => ({
      ...prevOpenRecords,
      [record.id]: !prevOpenRecords[record.id]
    }))
  }

  const addRecord = (record) => {
  
    dispatch({ type: "ADD_RECORD", record: { ...record, id: uuidv4() } });
    dispatch({ type: "UPDATE_RECORDS", records: [...records, { ...record, id: uuidv4() }] });
    setRecordDescriptions((prevDescriptions) => ({...prevDescriptions, [record.id]: record.description}))
  };

  const editRecord = (record) => {
    dispatch({ type: "EDIT_RECORD", record });
  }

  const handleEditRecord = (record) => {
    setEditingRecord(record);
  };
  const handleSaveChanges = (record) => {
    editRecord(record);
    setEditingRecord(null);
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  const handleDeleat = (record) => {
    dispatch({ type: "REMOVE_RECORD", id: record.id })
  }

  return (
    <div className=" mx-auto ">

    <h1 className="text-3xl font-bold mb-4">
      Профиль
    </h1>
    <p className="text-lg mb-2">Пользователь: {user.username}</p>
    <p className="text-lg mb-4">Почта: {user.email}</p>

    <h2 className="text-2xl font-bold mb-4">Заметки</h2>
    <AddNote addRecord={addRecord} />
    <ul className="list-none mb-4">
      {records.map((record) => (
        <li key={record.id} className="mb-4">
          {editingRecord && editingRecord.id === record.id ? (
            <RecordEditor
              record={record}
              onSave={handleSaveChanges}
              onCancel={handleCancelEdit}
            />
          ) : (
            <div className="flex  items-center">
              <span className="cursor-pointer" onClick={() => handleToggleDescription(record)}>
                <h3>
                  {record.title}
                  </h3>
              </span>
              {
                openRecords[record.id] && (
                  <div className="text-gray-600">{recordDescriptions[record.id]}</div>
                )
              }
              <div className="flex items-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleat(record)} ><FaRegTrashAlt/></button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEditRecord(record)}>
                  <MdOutlineEdit/>
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Profile