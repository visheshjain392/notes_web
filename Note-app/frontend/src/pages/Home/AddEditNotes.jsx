import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import TagInput from '../../components/Input/TagInput';
import axios from 'axios';
import {toast} from 'react-toastify'
const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id

        try {
            const res = await axios.post(
                "http://localhost:3000/api/note/edit/" + noteId,
                {title, content, tags},
                {withCredentials: true}
            )

            if(res.data.success === false){
                console.log(res.data.message);
                setError(res.data.message)
                toast.error(res.data.message)
                return
            }

            toast.success(res.data.message)
            getAllNotes()
            onClose()
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            setError(error.message)
            return 
        }
    };

    // Add Note
    const addNewNote = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/note/add",
                {title, content, tags}, 
                {withCredentials: true})

                if(res.data.success === false){
                    console.log(res.data.message);
                    setError(res.data.message)
                    toast.error(res.data.message)
                    return
                }

                toast.success(res.data.message)
                getAllNotes()
                onClose()
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            setError(error.message)
            
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError("Please enter the title");
            return;
        }
        if (!content) {
            setError("Please enter the content");
            return;
        }

        setError("");

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    return (
        <div className="relative p-6 bg-white rounded-lg shadow-lg">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-xl text-slate-400" />
            </button>

            <div className="text-xl text-slate-400">
                <label className="text-xs text-[#808080] uppercase">Title</label>
                <input
                    type="text"
                    className="text-2xl text-slate-950 outline-none block placeholder:block w-full p-2 border border-gray-300 rounded"
                    placeholder="Wake up at 6 a.m."
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="text-xs text-[#808080] uppercase">Content</label>
                <textarea
                    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300"
                    placeholder="Content..."
                    rows={10}
                    value={content}
                    onChange={({ target }) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="text-xs text-[#808080] uppercase">Tags</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

            <button
                className="bg-[#2B85FF] text-white font-medium mt-4 px-5 py-3 text-lg rounded hover:bg-blue-700 w-full inline-block"
                onClick={handleAddNote}
            >
                {type === "edit" ? "UPDATE" : "ADD"}
            </button>
        </div>
    );
};

export default AddEditNotes;
