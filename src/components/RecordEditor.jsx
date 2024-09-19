import React, { useState } from 'react'

const RecordEditor = ({ record, onSave, onCancel }) => {

    const [title, setTitle] = useState(record.title);
    const [description, setDescription] = useState(record.description);

    const handleSubmit = () => {
        onSave({ ...record, title, description });
        setDescription("")
    };

    return (
        <div className='flex  items-center flex-col'>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSubmit}>Сохранить изменения</button>
            <button onClick={onCancel}>Отмена</button>
        </div>
    )
}

export default RecordEditor