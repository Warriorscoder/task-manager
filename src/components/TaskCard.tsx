import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface TaskProps {
    task: {
        unique_id: string;
        title: string;
        description: string;
        status: 'complete' | 'incomplete';
        priority: 'Low' | 'Medium' | 'High';
        creation_date: string;
    };
}

export default function TaskCard({ task }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newStatus, setNewStatus] = useState<'complete' | 'incomplete'>(task.status);
    const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High'>(task.priority);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND}/delete-task`, {
                data: { taskId: task.unique_id }
            });

            if (response.data.success) {
                toast.success("Task deleted successfully");
                window.location.reload();
            } else {
                toast.error(response.data.message || "Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Server error while deleting task");
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND}/update-task`, {
                taskId: task.unique_id,
                status: newStatus,
                priority: newPriority,
            });

            if (response.data.success) {
                toast.success("Task updated successfully");
                window.location.reload();
            } else {
                toast.error(response.data.message || "Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Server error while updating task");
        }
    };

    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>Status: {task.status}</span>
                <span>Priority: {task.priority}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Created: {task.creation_date}</div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                >
                    {isEditing ? "Cancel" : "Update"}
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                >
                    Delete
                </button>
            </div>

            {/* Dropdowns for editing */}
            {isEditing && (
                <div className="mt-4 space-y-2">
                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value as 'complete' | 'incomplete')}
                            className="border rounded p-1 w-full"
                        >
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Priority</label>
                        <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                            className="border rounded p-1 w-full"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm w-full mt-2"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
}
