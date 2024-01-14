import React, { useState , useEffect, useRef} from 'react';

// addItem - function

const InputComponent = ({addItem}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '/' && inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
        event.preventDefault(); 
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  const handleSubmit = () => {
    if (inputValue === '') return;
    addItem(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="w-64">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-blue-500"
          placeholder="Add new task"
          value={inputValue}
          onChange={(e) => setInputValue(() => e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          ref={inputRef}
        />
        <button
          className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputComponent;
