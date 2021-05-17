import {Fragment} from 'react'
import {useState} from 'react'
import {connect} from 'react-redux'
import { Menu, Transition } from "@headlessui/react";
import {Draggable, Droppable} from 'react-beautiful-dnd'

import {deleteTask} from '../../actions'
import NewTask from './NewTask'
import TaskModal from './TaskModal'

const TaskList = (props) => {
    const [edit, setEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [emoji, setEmoji] = useState("💪")
    const [status, setStatus] = useState(false)
    const [index, setIndex] = useState(null)


    const closeModal = (val) =>{
        setEdit(val)
        setOpen(val)
        setTitle("")
        setEmoji("💪")
        setStatus(false)
    }

    const dropdownMenu = (index, task) => {
        return(
            <>
            <Menu className="relative inline-block text-left">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="focus:outline-none">&#10247;</Menu.Button>
                        </div>
                        <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                static
                                className="absolute mt-3 lg:right-32 right-10 divide-y divide-blue-100 w-40 bg-blue-100 p-2 rounded-md"
                            >
                                <Menu.Item>
                                {({ active }) => (
                                    <span
                                        className={`${active && "bg-blue-500 text-white"} w-full flex rounded-md p-1`}
                                        onClick={()=> {
                                            setEdit(true)
                                            setOpen(true)
                                            setTitle(task.title)
                                            setEmoji(task.emoji)
                                            setStatus(task.status)
                                            setIndex(index)
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 my-auto mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                        </svg>
                                        Edit
                                    </span>
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <span
                                        className={`${active && "bg-blue-500 text-white"} w-full flex rounded-md p-1`}
                                        onClick={() => props.deleteTask(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </span>
                                )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
            </>
        )
    }

    return(
        <>
        <Droppable droppableId="tasks">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="grid md:grid-cols-5 md:m-0 md:mt-10 m-7">
                    <div className="md:col-start-2 md:col-end-5 grid grid-flow-row align-middle divide-y-2 divide-blue-100">
                        <div className="grid mb-3">
                            <div className="text-4xl md:text-5xl font-semibold text-indigo-500">Task List</div>
                        </div>
                        <div className="row-start-3">
                            <div className="mt-5">
                                {(props.tasks).map((task, index)=>{
                                    return(
                                        <Draggable key={task.id} draggableId={task.title} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className="mt-1 flex px-2 py-1 font-normal text-lg text-blue-500 hover:bg-blue-100 rounded">
                                                    <span className="text-xl">{task.emoji}</span> <span className="ml-2 border-b-2 border-blue-200">{task.title}</span>
                                                    <span className={`ml-auto mr-3 text-sm py-1 px-3 rounded ${task.status? 'bg-green-100 text-green-600':'bg-yellow-100 text-yellow-600'}`}>{task.status?"Done": "Doing"}</span>
                                                    <span>{dropdownMenu(index, task)}</span>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                                <NewTask edit={false} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Droppable>
        {edit && <TaskModal open={open} closeModal={closeModal} edit={edit} title={title} index={index} emoji={emoji} status={status} />}
        </>
    )
}

const mapStateToProps = (state) => {
    return {tasks: state.task}
}

export default connect(mapStateToProps, {deleteTask})(TaskList)