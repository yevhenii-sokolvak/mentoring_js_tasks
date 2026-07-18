function Task({ title, description, isCompleted }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Статус: {isCompleted ? 'Виконано' : 'Не виконано'}</p>
    </div>
  );
}

export default Task;