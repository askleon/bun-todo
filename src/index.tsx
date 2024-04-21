import { Hono } from 'hono'
import { Layout } from './Layout'

const app = new Hono()
const todos = [
  { id: 1, title: 'Buy milk', complete: true },
  { id: 2, title: 'Buy eggs', complete: false },
]

const ListItems = () => {
  return <>
    {todos.map((todo) => (
      <li key={todo.id}>
        <input
          type="checkbox"
          id={todo.id.toString()}
          checked={todo.complete}
          hx-put={`/todo/${todo.id}`}
          hx-trigger="click"
          hx-target={`#todo-list`}
        />
        <label>
          {todo.title}
        </label>
        <button
          hx-delete={`/todo/${todo.id}`}
          hx-trigger="click"
          hx-target={`#todo-list`}>
          Delete
        </button>
      </li>
    ))}
  </>
}

app.get('/', (c) => {
  return c.html(
    <Layout />
  )
})

app.post('/todo', async (c) => {
  const { newTodo } = await c.req.parseBody()
  todos.push({ id: todos.length + 1, title: newTodo as string, complete: false })
  return c.html(ListItems())
})

app.put('/todo/:id', async (c) => {
  const id = c.req.param('id')
  const todo = todos.find((t) => t.id === parseInt(id))
  if (todo) {
    todo.complete = !todo.complete
  }
  return c.html(ListItems())
})

app.delete('/todo/:id', async (c) => {
  const id = c.req.param('id')
  const index = todos.findIndex((t) => t.id === parseInt(id))
  if (index !== -1) {
    todos.splice(index, 1)
  }
  return c.html(ListItems())
})

app.get('/todo', (c) => {
  return c.html(ListItems())
})

export default app;
