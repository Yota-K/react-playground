import { useFetchTodo } from './hooks/useFetchTodo'

export const SrpGoodExTodoList = () => {
  const { todo, isFetching } = useFetchTodo()

  if (isFetching) {
    return <p>...loading</p>
  }

  return (
    <ul>
      {todo.map((todo) => {
        return (
          <li>
            <span>{todo.id}</span>
            <span>{todo.title}</span>
          </li>
        )
      })}
    </ul>
  )
}
