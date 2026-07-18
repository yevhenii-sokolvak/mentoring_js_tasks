import Task from './components/Task';

function App() {
  return (
    <div>
      <Task
        title="Вивчити пропси"
        description="Розібратись, як передавати дані у компоненти"
        isCompleted={true}
      />
      <Task
        title="Додати Tailwind"
        description="Налаштувати стилізацію проекту"
        isCompleted={false}
      />
    </div>
  );
}

export default App;