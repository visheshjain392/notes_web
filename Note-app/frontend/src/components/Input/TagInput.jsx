import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        const newTag = inputValue.trim().toLowerCase();
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent unintended behavior
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="">
             {tags?.length > 0 && ( // Fixed typo here
        <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
                <span 
                    key={index} 
                    className="inline-flex items-center bg-slate-100 text-slate-900 text-sm px-3 py-1 rounded gap-2 m-1 whitespace-nowrap"
                >
                    #{tag}
                    <button 
                        onClick={() => handleRemoveTag(tag)} 
                        className="text-red-500 hover:text-red-700"
                    >
                        <MdClose />
                    </button>
                </span>
            ))}
        </div>
    )}

            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    value={inputValue}
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none w-full min-w-[150px]"
                    placeholder="Add Tags"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        inputValue.trim() ? "bg-blue-500 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!inputValue.trim()}
                    aria-disabled={!inputValue.trim()} 
                    onClick={addNewTag}
                >
                    <MdAdd />
                </button>
            </div>
        </div>
    );
};

export default TagInput;