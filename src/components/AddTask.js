import {useEffect, useState} from 'react'

const AddTask = (props) => {
    const [newTask, setNewTask] = useState(props.task)

    useEffect(() => {
        setNewTask(props.task)
    }, [props.task])

    const onTextChange = (e) => {
        setNewTask(e.target.value)
    }

    const onEnterPress = (e) => {
        if(e.keyCode === 13){
            if(newTask !== '' ){
                if(props.edit === false){
                    props.onTaskAdd(newTask)
                }
                else{
                    props.onTaskUpdate(newTask)
                }
                setNewTask(props.task)
            }
        }
    }

    const onClickAdd = (e) => {
        if(newTask !== ''){
            props.onTaskAdd(newTask)
            setNewTask(props.task)
        }
    }

    const onClickUpdate = (e) => {
        if(newTask !== ''){
            props.onTaskUpdate(newTask)
            setNewTask(props.task)
        }
    }

    return (
        <div>
            <div className="grid grid-cols-4">
                <div className="col-start-1 col-end-4">
                    <div className="bg-white text-gray-600 rounded-md overflow-hidden">
                        <input onChange={onTextChange} onKeyUp={onEnterPress} className="px-4 py-2.5 w-full focus:outline-none" value={newTask} placeholder="Task Description" />
                    </div>
                </div>
                {!props.edit &&
                    <button onClick={onClickAdd} className="bg-blue-500 text-white rounded-md ml-5 grid grid-flow-col px-2 cursor-pointer">
                        <div className="my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="my-auto">
                            <h1 className="font-medium">Add</h1>
                        </div>
                    </button>
                }
                {props.edit &&
                    <button onClick={onClickUpdate} className="bg-blue-500 text-white rounded-md ml-5 grid grid-flow-col px-2 cursor-pointer">
                        <div className="my-auto ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                        <div className="my-auto mr-1">
                            <h1 className="font-medium">Edit</h1>
                        </div>
                    </button>
                }
            </div>
        </div>
    )
}

export default AddTask