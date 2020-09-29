import React, { useState, useCallback } from "react"
import { useDispatch,useSelector } from "react-redux"
import { addTodo } from "src/store/list"
import { increment } from "src/store/counter"


const AddTodo = (props) => {
  const [todoText, setTodoText] = useState("")
  const counter = useSelector(state => state.counter)
  const list = useSelector(state => state.list)
  const [id, setId] = useState(0)
  
  const dispatch = useDispatch()
  
	const onChange = useCallback(
		e => {
			dispatch(increment())
			setTodoText(e.target.value) 
		},
		[dispatch]
	)
	return (
		<div>
			<p>click {counter} times</p>

			<ul>
				{list.length > 0
					? list.map(item => <li key={item.id}>{item.text}</li>)
					: null}
			</ul>

			<form
				onSubmit={e => {
					e.preventDefault()
					if (!todoText.trim()) return
					setId(id + 1)
					dispatch(addTodo({
						text: todoText,
						id,
					}))
					setTodoText("")
				}}
			>
				<input value={todoText} onChange={onChange} />
				<button type="submit">Add Todo</button>
			</form>
		</div>
	)
}

export default AddTodo
