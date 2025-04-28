/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { toast } from 'sonner';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');

  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast("Error", {
        description: "User not authenticated sign-in first",
      });
      return;
    }
  
    const decodedToken = jwtDecode<{ id: string }>(token);
    const userId = decodedToken.id;
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/create-task`, {
        userId,
        title: title,
        description: description,
        priority: priority,
      });
  
      if (response.data.success) {
        toast("Success", {
          description: "Task created successfully!",
        });
      } else {
        toast("Error", {
          description: response.data.message || "Failed to create task",
        });
      }
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "Server error while creating task",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded-lg bg-white">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
        className="border p-2 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
