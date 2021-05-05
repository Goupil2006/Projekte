import axios from "axios"

const url = 'http://jsonplaceholder.typicode.com/todos/1'

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then(response => {
    const todo = response.data as Todo;

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logtodo(id, title, completed);

});

const logtodo = (id: number, title: string, completed: boolean) => {
    console.log(`
        The todo ID is: ${id}
        the title is ${title}
        is it finisheed ${completed}
    `);
}