import React, { useState } from 'react'

export const AddNote = ({addRecord}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim() === ""){
            setError("Пожалуйста, заполните заголовок")
        }else{
            const record = { title, description };
            addRecord(record);
            setTitle('');
            setDescription('');
            setError(null)
        }
      };

      const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if(error){
            setError(null)
        }
      }
    
  return (
    <form>
    <label>Загаловок:</label>
    <input type="text" value={title} onChange={handleTitleChange} />
    {error && (
        <div style={{color:"red"}}>{error}</div>
    )}

    <label>Описание:</label>
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

    <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"   onClick={handleSubmit}>Добавить заметку</button>

  </form>
  )
}
