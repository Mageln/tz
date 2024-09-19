"use client"

import { AddNote } from '../../components/AddNote';
import RecordEditor from '../../components/RecordEditor';
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';


import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const records = useSelector((state) => state.records);


  const [editingRecord, setEditingRecord] = useState(null);

  const [openRecords, setOpenRecords] = useState({});

  const [description, setDescription] = useState('');

  const handleToggleDescription = (record) => {
    setOpenRecords((prevOpenRecords) => ({
      ...prevOpenRecords,
      [record.id]: !prevOpenRecords[record.id]
    }))
  }

  const addRecord = (record) => {

    dispatch({ type: "ADD_RECORD", record: { ...record, id: uuidv4() } });
    dispatch({ type: "UPDATE_RECORDS", records: [...records, { ...record, id: uuidv4() }] });
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

  const handleAddDescription = (record) => {
    editRecord({ ...record, description: description });
    setDescription('');
    setOpenRecords((prevOpenRecords) => ({ ...prevOpenRecords, [record.id]: true }));
  };

  return (
    <div className=" mx-auto ">

      <h1 className="text-3xl font-bold mb-4">
        Профиль
      </h1>
      <p className="text-lg mb-2"> <b> Пользователь:</b> {user.username}</p>
      <p className="text-lg mb-4"> <b>Почта: </b>  {user.email}</p>

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
                <div className="flex items-center -top-70px left-55px relative">
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
  )
}

export default Profile