import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import FilterButtons from './FilterButtons.js';
import TaskCard from './TaskCard.js';
import TaskForm from './TaskForm.js';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { toast } from 'sonner';

interface Task {
  unique_id: string;
  title: string;
  description: string;
  status: 'incomplete' | 'complete';
  priority: 'High' | 'Medium' | 'Low';
  creation_date: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<{ id: string }>(token);
      const userId = decodedToken.id;
      // console.log(userId);

      const fetchTasks = async () => {
        try {
          // console.log(import.meta.env.VITE_BACKEND);
          const response = await axios.post(`${import.meta.env.VITE_BACKEND}/all-task`, { userId });
          
          if (!response.data.success) {
            toast("Error", {
              description: response.data.message,
            });
            return; 
          }

          const tasksData = response.data.tasks; 
          setTasks(tasksData); 
        } catch (error) {
          console.log(error);
          toast("Error", {
            description: "Server Error",
          });
        }
      };

      fetchTasks();
    }
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Active') return task.status === 'incomplete';
    if (filter === 'Completed') return task.status === 'complete';
    return true;
  });

 
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <FilterButtons filter={filter} setFilter={setFilter} />
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {filteredTasks.map(task => (
              <TaskCard key={task.unique_id} task={task} />
            ))}
          </div>
        )}
        <TaskForm />
      </div>
    </div>
  );
}
