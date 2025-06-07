// tarefasService.js

let tasks = [
  { id: 1, title: "Tarefa 1", description: "Descrição da tarefa 1", step: "pendente" },
  { id: 2, title: "Tarefa 2", description: "Descrição da tarefa 2", step: "em andamento" },
];

const getData = async () => {

  return Promise.resolve(tasks);
};

const getDataById = async (id) => {
  const task = tasks.find((t) => t.id === id);
  return Promise.resolve(task);
};

const postData = async (data) => {
  const newTask = { ...data, id: Date.now() };
  tasks.push(newTask);
  return Promise.resolve(newTask);
};

const patchStep = async (id, step) => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.step = step;
    return Promise.resolve(task);
  }
  return Promise.reject("Tarefa não encontrada");
};

const deleteData = async (id) => {
  tasks = tasks.filter((t) => t.id !== id);
  return Promise.resolve({ success: true });
};

const putData = async (id, data) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...data };
    return Promise.resolve(tasks[index]);
  }
  return Promise.reject("Tarefa não encontrada");
};

export { getData, postData, patchStep, deleteData, putData, getDataById };
