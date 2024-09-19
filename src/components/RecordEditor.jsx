import React, { useCallback, useState } from 'react'

const RecordEditor = ({ record, onSave, onCancel }) => {

    const [title, setTitle] = useState(record.title);
    const [description, setDescription] = useState(record.description);

    const handleSubmit = useCallback(() => {
        onSave({ ...record, title, description });
        setDescription("")
    },[]);

    return (
        <div className='flex flex-col items-center p-4 border border-gray-300 rounded'>
            <h2 className='text-lg font-bold mb-2'>Редактировать запись</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание"
                className="w-full h-20 p-2 mb-2 border border-gray-300 rounded"
            />
            <div className='flex justify-between'>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Сохранить изменения
                </button>
                <button
                    onClick={onCancel}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Отмена
                </button>
            </div>
        </div>
    )
}

export default RecordEditor