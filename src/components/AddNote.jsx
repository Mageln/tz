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
    <form className='flex'>
    <label>

    <input className='w-300px  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={title} onChange={handleTitleChange} />
    </label>
    {error && (
        <div style={{color:"red", position:"absolute", top:"156px"}}>{error}</div>
    )}

    {/* <label>Описание:</label>
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /> */}

    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"   onClick={handleSubmit}>Добавить заметку</button>
    
  </form>
  )
}
