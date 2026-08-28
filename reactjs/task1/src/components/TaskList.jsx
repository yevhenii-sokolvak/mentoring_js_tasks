import {useState} from 'react';
import Task from './Task';
import TaskAddForm from './TaskAddForm';

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      title: 'Вивчити пропси',
      description: 'Розібратись, як передавати дані у компоненти',
      isCompleted: true,
    },
    {
      title: 'Додати Tailwind',
      description: 'Налаштувати стилізацію проекту',
      isCompleted: false,
    },
  ]);

  const handleToggleComplete = (index) => {
    setTasks((prevTasks) => 
      prevTasks.map((task, i) => 
        i === index? {...task, isCompleted: !task.isCompleted} : task
      )
    );
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3 px-4">
      <TaskAddForm onAddTask={handleAddTask} />

      {tasks.map((task, index) => (
        <Task
          key={index}
          title={task.title}
          description={task.description}
          isCompleted={task.isCompleted}
          onToggleComplete={() => handleToggleComplete(index)}
        />
      ))}
    </div>
  );
}

export default TaskList;