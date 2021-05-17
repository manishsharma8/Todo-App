import {useState} from 'react'
import TaskModal from './TaskModal'

const NewTask = (props) => {
  const [open, setOpen] = useState(false)

  const closeModal = (val) =>{
    setOpen(val)
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={()=>setOpen(true)}
          className="mt-5 ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-md bg-opacity-90 hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          New Task
        </button>
      </div>
      {/* include Task Modal */}
      {open && <TaskModal open={open} closeModal={closeModal} edit={false} title="" emoji="💪" status={false} />}
    </>
  );
}

export default NewTask;