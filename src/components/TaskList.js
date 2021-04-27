import {Draggable} from 'react-beautiful-dnd'

const TaskList = ({task, id, onDeleteClick, onEditClick}) => {
    return(
        <Draggable key={id} draggableId={task} index={id}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <li className="my-2 bg-white px-4 py-2.5 text-gray-500 text-lg font-base rounded-md grid grid-flow-col grid-cols-2">
                        <div>
                            {task}
                        </div>
                        <div onClick={() => onEditClick(id)} className="ml-auto text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <div onClick={() => onDeleteClick(id)} className="ml-3 text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </li>
                </div>
            )}
        </Draggable>
        
    )
}

export default TaskList