'use strict'

import fs from 'fs';
import Todo from "./Todo.js";

export default class TodoList {
    constructor(args) {
        this.args = args;

    }

    read(filename) {
        let fileContent;
        try {
            fileContent = fs.readFileSync(filename, "utf-8");
        }
        catch (err) {
            return '';
        }
        return fileContent;
    }

    write(filename, data) {
        try {
            fs.writeFileSync(filename, data);
        }
        catch (err) {
            throw new Error('Sikertelen fájlbevitel.');
        }
    }

    getTodosFileName() {
        const filePath = "data/listOfTodos.json"
        return filePath;
    }

    printDescription() {
        console.log(this.read("data/userGuide.txt"));
    }

    getList() {
        let rawTodoList = JSON.parse(this.read(this.getTodosFileName()));
        let convertedTodoList = [];
        rawTodoList.forEach(element => {
            if (element.todo != undefined && element.completed != undefined) {
                convertedTodoList.push(new Todo(element.todo, element.completed));
            }
        });
        return convertedTodoList;
    }

    printTodoList() {
        let todoContent = this.getList();
        if (todoContent.length === 0) {
            console.log("Nincs mára tennivalód! :)");
        } else {
            for (let index = 0; index < todoContent.length; index++) {
                console.log(`${index + 1} - ${todoContent[index].toString()}`);
            }
        }
    }

    addTodo(text) {
        let todo = new Todo(text);
        let todoList = this.getList();
        todoList.push(todo);
        const myJSON = JSON.stringify(todoList);
        this.write(this.getTodosFileName(), myJSON);
    }

    deleteTodo(index) {
        let todoList = this.getList();
        todoList.splice(index - 1, 1);
        const myJSON = JSON.stringify(todoList);
        this.write(this.getTodosFileName(), myJSON);
    }

    setCompleted(index) {
        let todoList = this.getList();
        todoList[index - 1].complete();
        const myJSON = JSON.stringify(todoList);
        this.write(this.getTodosFileName(), myJSON);
    }

    print(string) {
        console.log(string);
    }

    run() {
        switch (this.args[0]) {
            case ("-l" || "--list"):
                this.printTodoList();
                break;
            case ("-a"):
                this.addTodo(this.args[1])
                break;
            case ("-r"):
                this.deleteTodo(this.args[1])
                break;
            case ("-c"):
                this.setCompleted(this.args[1])
                break;
            default:
                this.printDescription();
                break;
        }
    }
}