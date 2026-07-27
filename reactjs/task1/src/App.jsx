import Task from './components/Task';

function App() {
  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3 px-4">
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