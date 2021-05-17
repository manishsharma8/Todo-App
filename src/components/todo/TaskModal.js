import {Fragment, useState, useRef} from 'react'
import { Dialog, Transition } from "@headlessui/react";
import {connect} from 'react-redux'
import {createTask, editTask} from '../../actions'
import Picker from 'emoji-picker-react'

const TaskModal = (props) => {
    const[title, setTitle] = useState(props.title)
    const[emoji, setEmoji] = useState(props.emoji)
    const[showEmoji, setShowEmoji] = useState(false)
    const[status, setStatus] = useState(props.status)
    const cancelButtonRef = useRef();

    function closeModal() {
        if(title){
            if(!props.edit){
                const id = window.Date.now()
                console.log(emoji)
                props.createTask(id, title, emoji, status)
            }
            else{
                props.editTask(props.index, title, emoji, status)
            }
        }
        setTitle("")
        props.closeModal(false)
    }

    const toggleEmojiPicker = () =>{
        setShowEmoji(!showEmoji)
    }

    const toggleStatus = () =>{
        setStatus(!status)
    }

    return(
        <>
            <Transition show={props.open} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    static
                    open={props.open}
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                        &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                Task Details
                                </Dialog.Title>
                                <div onClick={toggleEmojiPicker} className="mt-5 text-3xl">
                                    <span className="hover:bg-gray-100 rounded-md cursor-pointer p-1">{emoji}</span>
                                </div>
                                {showEmoji && 
                                    <div className="mt-5 mb-10 absolute -left-72 -top-4 z-20 rounded-2xl">
                                        <Picker 
                                            native 
                                            onEmojiClick={(e, ej)=>{
                                                setEmoji(ej.emoji)
                                                setShowEmoji(false)
                                            }}
                                        />
                                    </div>
                                }
                                <div className="mt-5">
                                    <p className="text-sm text-gray-500">
                                        Enter task title
                                    </p>
                                    <input onChange={(e)=> setTitle(e.target.value)} className="mt-2 w-full text-gray-600 text-xl font-medium focus:outline-none" placeholder="Untitled" value={title} />
                                </div>
                                <div className="mt-5">
                                    <div className="text-sm text-gray-500">
                                        Status
                                    </div>
                                    <div onClick={toggleStatus} className={`mt-2 py-1 px-3 inline-flex cursor-pointer rounded ${status? 'bg-green-100 text-green-600':'bg-yellow-100 text-yellow-600'}`}>
                                        {status ? "Done":"Doing"}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center mt-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Add to the list!
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default connect(
    null,
    {createTask, editTask}
)
(TaskModal)