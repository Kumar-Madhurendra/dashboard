import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = {
  todo: [
    { id: '1', title: 'Design new dashboard layout', priority: 'high', assignee: 'John Doe' },
    { id: '2', title: 'Implement user authentication', priority: 'medium', assignee: 'Jane Smith' },
    { id: '3', title: 'Create API documentation', priority: 'low', assignee: 'Bob Johnson' },
  ],
  inProgress: [
    { id: '4', title: 'Setup database schema', priority: 'high', assignee: 'Alice Brown' },
    { id: '5', title: 'Write unit tests', priority: 'medium', assignee: 'Charlie Wilson' },
  ],
  done: [
    { id: '6', title: 'Setup project structure', priority: 'high', assignee: 'Diana Miller' },
    { id: '7', title: 'Configure CI/CD pipeline', priority: 'medium', assignee: 'Edward Davis' },
  ],
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium',
    assignee: '',
    column: 'todo'
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    if (source.droppableId === destination.droppableId) {
      const column = tasks[source.droppableId];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: copiedItems,
      });
    } else {
      const sourceColumn = tasks[source.droppableId];
      const destColumn = tasks[destination.droppableId];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    }
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      priority: newTask.priority,
      assignee: newTask.assignee,
    };

    setTasks({
      ...tasks,
      [newTask.column]: [...tasks[newTask.column], task],
    });

    setNewTask({
      title: '',
      priority: 'medium',
      assignee: '',
      column: 'todo'
    });
    setIsAddingTask(false);
  };

  const handleEditTask = (taskId, columnId) => {
    const task = tasks[columnId].find(t => t.id === taskId);
    setEditingTask({ ...task, columnId });
    setNewTask({
      title: task.title,
      priority: task.priority,
      assignee: task.assignee,
      column: columnId
    });
  };

  const handleUpdateTask = () => {
    if (!newTask.title.trim()) return;

    const updatedTasks = {
      ...tasks,
      [editingTask.columnId]: tasks[editingTask.columnId].map(task =>
        task.id === editingTask.id
          ? {
              ...task,
              title: newTask.title,
              priority: newTask.priority,
              assignee: newTask.assignee,
            }
          : task
      ),
    };

    setTasks(updatedTasks);
    setEditingTask(null);
    setNewTask({
      title: '',
      priority: 'medium',
      assignee: '',
      column: 'todo'
    });
  };

  const handleDeleteTask = (taskId, columnId) => {
    setTasks({
      ...tasks,
      [columnId]: tasks[columnId].filter(task => task.id !== taskId),
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const TaskForm = ({ onSubmit, initialValues = newTask }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            value={initialValues.title}
            onChange={(e) => setNewTask({ ...initialValues, title: e.target.value })}
            placeholder="Task title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <select
            value={initialValues.priority}
            onChange={(e) => setNewTask({ ...initialValues, priority: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <input
            type="text"
            value={initialValues.assignee}
            onChange={(e) => setNewTask({ ...initialValues, assignee: e.target.value })}
            placeholder="Assignee"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <select
            value={initialValues.column}
            onChange={(e) => setNewTask({ ...initialValues, column: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsAddingTask(false);
                setEditingTask(null);
                setNewTask({
                  title: '',
                  priority: 'medium',
                  assignee: '',
                  column: 'todo'
                });
              }}
              className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {editingTask ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <button
          onClick={() => setIsAddingTask(true)}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>

      {(isAddingTask || editingTask) && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          initialValues={editingTask ? newTask : undefined}
        />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">To Do</h2>
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {tasks.todo.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Assigned to: {task.assignee}</p>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditTask(task.id, 'todo')}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id, 'todo')}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* In Progress Column */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">In Progress</h2>
            <Droppable droppableId="inProgress">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {tasks.inProgress.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Assigned to: {task.assignee}</p>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditTask(task.id, 'inProgress')}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id, 'inProgress')}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Done Column */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Done</h2>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3"
                >
                  {tasks.done.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Assigned to: {task.assignee}</p>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditTask(task.id, 'done')}
                              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id, 'done')}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard; 