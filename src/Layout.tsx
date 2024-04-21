export const Layout = () => {
  return <html>
    <head>
      <title>Todo</title>
      <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css"></link>
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
    </head>
    <body>
      <header>
        <h1>Simple todo app</h1>
        <label>Built with bun🐰, hono🔥, htmx🕸️ & simple.css🖌️</label>
      </header>
      <main>
        <form hx-post="/todo" hx-target="#todo-list">
          <label for="newTodo">New Todo:</label>
          <input type="text" name="newTodo" id="newTodo" />
          <button type="submit">Submit</button>
        </form>
        <ol id="todo-list" hx-get="/todo" hx-trigger="load" />
      </main>
      <footer></footer>
    </body>
  </html>
}
