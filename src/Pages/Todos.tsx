import Layout from "../Layout/Layout";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

import { IoCheckmarkOutline } from "react-icons/io5";
import { FaPen } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TodoType {
  title: string;
  description: string;
  isCompleted: boolean;
}

const Todos = () => {
  const getTodos = () => {
    const todoData = localStorage.getItem("todos");
    if (todoData) {
      return JSON.parse(todoData);
    } else {
      return [];
    }
  };

  const handleCompleted = (idx: number) => {
    const data = [...todos];
    data[idx].isCompleted = !data[idx].isCompleted;

    setTodos(data);
  };

  const handleEdit = (idx: number) => {
    const data = [...todos];
    data[idx] = addTask;
    setTodos(data);
    setAddTask({ title: "", description: "", isCompleted: false });
  };

  const handleDelete = (idx: number) => {
    const data = [...todos];
    data.splice(idx, 1);
    setTodos(data);
  };

  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState<TodoType[]>(getTodos());
  const [addTask, setAddTask] = useState<TodoType>({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleSubmit = () => {
    if (!addTask.title) return;
    setTodos((prev) => [...prev, addTask]);

    setAddTask({
      title: "",
      description: "",
      isCompleted: false,
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="lg:px-40 lg:py-8 sm:p-2">
      <div className="py-4 rounded-lg w-full flex gap-2">
        <Dialog>
          <Input
            placeholder="Search Task"
            onChange={(e) => setSearch(e.target.value)}
          />
          <DialogTrigger asChild>
            <Button>
              <FaPlus className="mr-2" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription>
                Add your Task Here. Click save task when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Task Title
                </Label>
                <Input
                  required
                  placeholder="Learn Next.js"
                  type="text"
                  className="col-span-3"
                  value={addTask.title}
                  onChange={(e) =>
                    setAddTask((prev) => ({
                      ...prev,
                      title: e.target.value as string,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Task Description
                </Label>
                <Textarea
                  required
                  value={addTask.description}
                  onChange={(e) =>
                    setAddTask((prev) => ({
                      ...prev,
                      description: e.target.value as string,
                    }))
                  }
                  placeholder="Learn about the Next.Js 14 version"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Save task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <AnimatePresence>
        {todos
          .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
          .map((todo, idx) => (
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
              exit={{ x: "-100vw" }}
            >
              <Dialog key={idx}>
                <Card
                  className={`w-full ${
                    todo.isCompleted ? "bg-green-200" : "bg-red-100"
                  } mb-2`}
                >
                  <CardHeader>
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="p-4">
                        <CardTitle>{todo.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {todo.description}
                        </CardDescription>
                      </div>
                      <div>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() =>
                              setAddTask({
                                title: todo.title,
                                description: todo.description,
                                isCompleted: todo.isCompleted,
                              })
                            }
                            variant="outline"
                            className="border-2 border-gray-200"
                          >
                            <FaPen />
                          </Button>
                        </DialogTrigger>
                        <Button
                          className="ml-2"
                          onClick={() => handleDelete(idx)}
                        >
                          <RiDeleteBin6Line />{" "}
                        </Button>
                        {todo.isCompleted ? (
                          <Button
                            className="ml-2"
                            onClick={() => handleCompleted(idx)}
                          >
                            <FaXmark className="text-lg mr-2" /> Mark as
                            Incomplete
                          </Button>
                        ) : (
                          <Button
                            className="ml-2"
                            onClick={() => handleCompleted(idx)}
                          >
                            <IoCheckmarkOutline className="text-lg mr-2" /> Mark
                            as Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription>
                      Edit your Task Here. Click save task when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Task Title
                      </Label>
                      <Input
                        required
                        placeholder={addTask.title}
                        type="text"
                        className="col-span-3"
                        value={addTask.title}
                        onChange={(e) =>
                          setAddTask((prev) => ({
                            ...prev,
                            title: e.target.value as string,
                          }))
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Task Description
                      </Label>
                      <Textarea
                        required
                        value={addTask.description}
                        onChange={(e) =>
                          setAddTask((prev) => ({
                            ...prev,
                            description: e.target.value as string,
                          }))
                        }
                        placeholder={addTask.description}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => handleEdit(idx)}>
                      Save task
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Layout(Todos);
