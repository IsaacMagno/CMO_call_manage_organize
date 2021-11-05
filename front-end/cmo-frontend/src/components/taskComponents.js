import React from 'react';
import Tasks from '../tasks';
import {
  Button,
  Select,
  MenuItem,
  TextField,
  Paper,
  InputLabel,
  FormControl,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';

const darkTheme = createTheme({ palette: { mode: 'dark' } });

class TaskComponent extends Tasks {
  constructor(props) {
    super(props);

    this.state =  { tasks: [], status: 'pending', currentTask: '', filter: 'data' };
  }
  render() { 
    const { tasks } = this.state;
    return (
      <Paper className="container" elevation={ 5 }>
      <div className="heading">CMO Tasks</div>
      <FormControl>
        <InputLabel id='filterLabel'>Filter</InputLabel>
        <Select
            labelId='filterLabel'
            variant='outlined'
            onChange={ this.handleChangeFilter }
            style={ { height: '40px', marginTop: '10px' } }
            value={ this.state.filter }
          >
            <MenuItem value={"data"}>Data</MenuItem>
            <MenuItem value={"alpha"}>Alpha</MenuItem>
            <MenuItem value={"status"}>Status</MenuItem>
          </Select>
      </FormControl>
      <form
        onSubmit= { this.handleSubmit }
        className="flex"
        style= { { margin: '15px 0' } }
      >
        <TextField 
          variant='outlined'
          size='small'
          value={ this.state.currentTask }
          onChange={ this.handleChange }
          placeholder="New Task"
          style={ { width: '80%' } }
          required= { true }
        />
        <Select
          variant='outlined'
          onChange={ this.handleChangeStatus }
          style={ { marginLeft: '20px', height: '40px' } }
          value={this.state.status}
        >
          <MenuItem value={"pending"}>Pending</MenuItem>
          <MenuItem value={"in progress"}>In progress</MenuItem>
          <MenuItem value={"done"}>Done</MenuItem>
        </Select>
        <Button
          type="submit"
          style={ { height: '40px', marginLeft: '20px', padding: '30px' } }
          color='primary'
          variant='outlined'
        >
          New Task
        </Button>
      </form>
      <ThemeProvider theme={darkTheme}>
        <Paper
          variant='outlined'
          elevation={5}
        >
            { tasks.map((task) => (
              <li key={ task._id } className='flex task_container'>
                <div className='task'>
                  <div className='taskList'>
                    { task.task }
                  </div>
                  <div className='taskDate'>
                    { task.date.split('T')[0]}
                  </div>
                  <div className='taskStatus'>
                    { task.status }
                  </div>
                </div>
                <Select
                  onChange={ ({ target }) => this.handleUpdate(task._id, target) }
                  style={{ marginLeft: '20px', height: '20px', width: '40px'}}
                  value={''}
                  variant='standard'
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in progress">In progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
                <Button
                  onClick={() => this.handleDelete(task._id)}
                  style={ { height: '20px', marginLeft: '20px' } }
                >
                  delete
                </Button>
              </li>
            )) }
        </Paper>
      </ThemeProvider>
      </Paper>
    )
  }
}

export default TaskComponent;
