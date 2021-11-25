'use strict'

import TodoList from "./TodoList.js";
import Todo from "./Todo.js";

const argv = process.argv.slice(2)

const app = new TodoList(argv);
app.run();