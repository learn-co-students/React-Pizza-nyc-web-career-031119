import React from "react"

const Pizza = (props) => {

  const handleClick = () => {
    props.selectPizza(props.pizza)
  }

  return(
    <tr>
      <td>{ props.pizza.topping }</td>
      <td>{ props.pizza.size }</td>
      <td>{ props.pizza.vegetarian ? "Yes" : "No" }</td>
      <td><button type="button" className="btn btn-primary" onClick={handleClick}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
