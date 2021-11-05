import { Component } from 'react';
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from './services/taskServices';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = { tasks: [], status: 'pending', currentTask: '', filter: 'data' };
  }

  async componentDidMount() {
    try {
      const { data } = await getTasks();
      this.setState({ tasks: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    this.setState({ currentTask: input.value });
  }

  handleChangeStatus = ({ target: { value }}) => {
    this.setState({ status: value });
  }

  handleChangeFilter = ({ target: { value }}) => {
    this.setState({ filter: value });
    const { tasks } = this.state;

    if (value === 'alpha') {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (a.task > b.task) return 1
        if (a.task < b.task) return -1
        return 0
      });
      this.setState({ tasks: sortedTasks })
    }

    if (value === 'status') {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status > b.status) return 1
        if (a.status < b.status) return -1
        return 0
      });
      this.setState({ tasks: sortedTasks })
    }

    if (value === 'data') {
      const sortedTasks = [...tasks].sort((a, b) => (
        new Date(a.date) - new Date(b.date)
      ));
      this.setState({ tasks: sortedTasks })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const originalTasks = this.state.tasks

    try {
      const { data } = await addTask({ task: this.state.currentTask, status: this.state.status });
      console.log(data);
      const tasks = originalTasks;
      tasks.push(data.task);
      this.setState({ tasks, currentTask: '', status: 'pending' });
    } catch (error) {
      console.log(error);
    }
  }

  handleUpdate = async (currentTask, { value }) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = [...originalTasks];
      const index = tasks.findIndex((task) => task._id === currentTask);
      tasks[index] = { ...tasks[index], status: value };
      this.setState({ tasks: tasks });
      await updateTask(currentTask, { ...tasks[index] });
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  }

  handleDelete = async (currentTask) => {
    const originalTasks = this.state.tasks;
    try {
      const tasks = originalTasks.filter(
        (task) => task._id !== currentTask
      );
      this.setState({ tasks });
      await deleteTask(currentTask);
    } catch (error) {
      this.setState({ tasks: originalTasks });
      console.log(error);
    }
  }
}

export default Tasks;