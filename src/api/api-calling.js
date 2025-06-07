const handleCreateTask = async (taskData) => {
  try {
    const newTask = await createTask({
      title: taskData.title,
      description: taskData.description,
      assignedTo: taskData.employeeId,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      status: 'pending'
    });
    console.log('Task created:', newTask);
  } catch (error) {
    console.error('Failed to create task:', error);
  }
};

const handleUpdateTaskStatus = async (taskId, newStatus) => {
  try {
    await updateTask(taskId, {
      status: newStatus
    });
    console.log('Task status updated');
  } catch (error) {
    console.error('Failed to update task:', error);
  }
};

const fetchEmployeeTasks = async (employeeId) => {
  try {
    const tasks = await getEmployeeTasks(employeeId);
    console.log('Employee tasks:', tasks);
    return tasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
};

const fetchAllTasks = async () => {
  try {
    const tasks = await getAllTasks();
    console.log('All tasks:', tasks);
    return tasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return [];
  }
};