import { useEffect, useEffectEvent, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:4000/api";

const emptyForm = { name: "", isComplete: "no" };

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/all-task`);
            setTasks(data.tasks || []);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load tasks");
        }
    };

    const loadTasks = useEffectEvent(fetchTasks);

    useEffect(() => {
        const timerId = setTimeout(loadTasks, 0);

        return () => clearTimeout(timerId);
    }, []);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            toast.error("Task name is required.");
            return;
        }

        setLoading(true);

        try {
            if (editingId) {
                const { data } = await axios.put(`${API_URL}/update-task/${editingId}`, {
                    name: form.name.trim(),
                    isComplete: form.isComplete,
                });

                setTasks((currentTasks) =>
                    currentTasks.map((task) => (task._id === editingId ? data.task : task))
                );
                toast.success("Task updated successfully.");
            } else {
                const { data } = await axios.post(`${API_URL}/add-task`, {
                    name: form.name.trim(),
                });

                setTasks((currentTasks) => [data.newTask, ...currentTasks]);
                toast.success("Task added successfully.");
            }

            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (taskId) => {
        try {
            const { data } = await axios.get(`${API_URL}/single-task/${taskId}`);
            setForm({
                name: data.task.name,
                isComplete: data.task.isComplete,
            });
            setEditingId(taskId);
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to load task details.");
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${API_URL}/delete-task/${taskId}`);
            setTasks((currentTasks) => currentTasks.filter((task) => task._id !== taskId));

            if (editingId === taskId) {
                resetForm();
            }

            toast.success("Task deleted successfully.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete task.");
        }
    };

    const handleToggleStatus = async (task) => {
        const nextStatus = task.isComplete === "yes" ? "no" : "yes";

        try {
            const { data } = await axios.put(`${API_URL}/update-task/${task._id}`, {
                name: task.name,
                isComplete: nextStatus,
            });

            setTasks((currentTasks) =>
                currentTasks.map((item) => (item._id === task._id ? data.task : item))
            );
            toast.success(`Task marked as ${nextStatus === "yes" ? "completed" : "not completed"}.`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Unable to update task.");
        }
    };

    const completedCount = tasks.filter((task) => task.isComplete === "yes").length;
    const pendingCount = tasks.length - completedCount;

    return (
        <div className="min-h-full bg-[#f4f0e8] px-4 py-8 text-[#17212b] sm:px-6 lg:px-8 lg:py-12">
            <div className="mx-auto max-w-7xl">
                <section className="relative mb-8 overflow-hidden rounded-4xl bg-[#233746] px-6 py-8 text-white shadow-xl shadow-[#233746]/15 sm:px-10 sm:py-10">
                    <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-28 border-[#f16f5c]/20" />
                    <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <div className="max-w-xl">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f6b1a4]">Tuesday, September 23</p>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Make room for what matters.</h1>
                            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-base">A simple space to capture your next move and keep the day moving forward.</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <div className="min-w-20 rounded-2xl bg-white/10 p-3 backdrop-blur-sm sm:min-w-24 sm:p-4">
                                <p className="text-2xl font-bold">{tasks.length}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-300">Total</p>
                            </div>
                            <div className="min-w-20 rounded-2xl bg-[#7ed6a6]/15 p-3 text-[#c8f1d8] sm:min-w-24 sm:p-4">
                                <p className="text-2xl font-bold">{completedCount}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-wider text-[#a9dfbc]">Done</p>
                            </div>
                            <div className="min-w-20 rounded-2xl bg-[#f16f5c]/15 p-3 text-[#ffd1c8] sm:min-w-24 sm:p-4">
                                <p className="text-2xl font-bold">{pendingCount}</p>
                                <p className="mt-1 text-[10px] uppercase tracking-wider text-[#f6b1a4]">Open</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.6fr)]">
                    <form onSubmit={handleSubmit} className="h-fit rounded-3xl border border-[#e0d9cd] bg-[#fffdf9] p-6 shadow-sm sm:p-7">
                        <div className="mb-7 flex items-start justify-between gap-4">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f16f5c]">Plan the next step</p>
                                <h2 className="text-2xl font-bold tracking-tight text-[#17212b]">
                            {editingId ? "Edit task" : "Add new task"}
                                </h2>
                            </div>
                            <span className="text-2xl text-[#d7d0c4]">✦</span>
                        </div>

                        <label className="mb-2 block text-sm font-semibold text-[#39444d]">Task name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                            placeholder="Enter task title"
                            className="w-full rounded-xl border border-[#d7d0c4] bg-[#fffdf9] px-3 py-3 text-[#17212b] outline-none transition placeholder:text-[#a7a096] focus:border-[#f16f5c] focus:ring-4 focus:ring-[#f16f5c]/10"
                        />

                        <label className="mb-2 mt-5 block text-sm font-semibold text-[#39444d]">Status</label>
                        <select
                            value={form.isComplete}
                            onChange={(event) => setForm({ ...form, isComplete: event.target.value })}
                            className="w-full rounded-xl border border-[#d7d0c4] bg-[#fffdf9] px-3 py-3 text-[#17212b] outline-none transition focus:border-[#f16f5c] focus:ring-4 focus:ring-[#f16f5c]/10"
                        >
                            <option value="no">Not completed</option>
                            <option value="yes">Completed</option>
                        </select>

                        <div className="mt-7 flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-xl bg-[#f16f5c] px-4 py-3 font-semibold text-[#17212b] transition hover:bg-[#e85d49] disabled:cursor-not-allowed disabled:bg-[#f4b2a7]"
                            >
                                {loading ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update task" : "Add task"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-xl border border-[#d7d0c4] px-4 py-2.5 font-semibold text-[#59636a] transition hover:bg-[#f4f0e8]"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="rounded-3xl border border-[#e0d9cd] bg-[#fffdf9] p-6 shadow-sm sm:p-7">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight text-[#17212b]">Your tasks</h2>
                            <span className="rounded-full bg-[#f4f0e8] px-3 py-1.5 text-xs font-bold text-[#687078]">
                                {tasks.length} items
                            </span>
                        </div>

                        <div className="space-y-3">
                            {tasks.length === 0 ? (
                                    <div className="rounded-2xl border border-dashed border-[#d7d0c4] bg-[#f8f5ef] p-10 text-center text-[#7d8588]">
                                    <p className="mb-2 text-3xl text-[#d7d0c4]">✦</p>
                                    No tasks yet. Add your first task to get started.
                                </div>
                            ) : (
                                tasks.map((task) => (
                                    <div
                                        key={task._id}
                                        className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#e7e0d5] bg-[#faf8f3] p-4 transition hover:border-[#cfc5b6] sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleStatus(task)}
                                                className={`h-6 w-6 shrink-0 rounded-full border-2 transition ${
                                                    task.isComplete === "yes"
                                                        ? "border-[#7ed6a6] bg-[#7ed6a6]"
                                                        : "border-[#c9c1b5] bg-white"
                                                }`}
                                                aria-label={`Toggle task status for ${task.name}`}
                                            />
                                            <div>
                                                <p
                                                    className={`font-medium ${
                                                        task.isComplete === "yes" ? "text-[#a7aaa7] line-through" : "text-[#17212b]"
                                                    }`}
                                                >
                                                    {task.name}
                                                </p>
                                                <p className="text-xs text-[#8d918f]">
                                                    {task.isComplete === "yes" ? "Completed" : "Not completed"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex w-full gap-2 sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(task._id)}
                                                className="flex-1 rounded-lg bg-[#f6ead0] px-3 py-2 text-sm font-semibold text-[#9a6a21] transition hover:bg-[#f1dfb8] sm:flex-none"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(task._id)}
                                                className="flex-1 rounded-lg bg-[#fbe1dc] px-3 py-2 text-sm font-semibold text-[#b94f40] transition hover:bg-[#f5ccc4] sm:flex-none"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={2500} hideProgressBar />
        </div>
    );
};

export default Home;