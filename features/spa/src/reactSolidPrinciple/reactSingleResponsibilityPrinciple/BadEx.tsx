import React, { useEffect, useState } from 'react'
import axios from 'axios'

type TodoType = {
  id: number
  userId: number
  title: string
  completed: boolean
}

// 単一責任の原則（Single responsibility principle）
//
// bad
// フェッチ処理とTODOの描画という２つの責務を同じコンポーネントの中で行っている
//
// - データを取得する部分で指定しているエンドポイントが変更されたとすると、このコンポーネントを変更する必要がある。
// - タイトルのスタイルを変更したい場合も、このコンポーネントを変更する必要がある。
//
// 変更されるべき理由がこのコンポーネントには複数存在している点がよくない
export const SrpBadExTodoList = () => {
  const [data, setData] = useState<TodoType[]>([])
  const [isFetching, setIsFetching] = useState(true)

  // フェッチ処理
  useEffect(() => {
    axios
      .get<TodoType[]>('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        setData(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [])

  if (isFetching) {
    return <p>...loading</p>
  }

  // TODOの描画
  return (
    <ul>
      {data.map((todo) => {
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
