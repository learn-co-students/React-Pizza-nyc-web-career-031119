import React from "react"

const PizzaForm = (props) => {

  const handleToppingChange = (e) => {
    if (props.pizza) {
      props.changeTopping(e.target.value)
    } else {
      e.target.value = null;
    }
  }

  const handleSizeChange = (e) => {
    if (props.pizza) {
      props.changeSize(e.target.value)
    } else {
      e.target.value = null
    }
  }

  const handleVegeChange = (e) => {
    if (props.pizza) {
      if (e.target.name === "vege") {
        props.changeVegeStatus(true);
      } else if (e.target.name === "non-vege") {
        props.changeVegeStatus(false)
      }
    } else {
      e.target.checked = null;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.pizza) {
      props.submitChanges();
    } else {
      console.log("Nope");
    }
  }

  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" onChange={handleToppingChange} value={
                props.pizza ? props.pizza.topping :
                null
              }/>
        </div>
        <div className="col">
          <select value={props.pizza ? props.pizza.size : null} className="form-control" onChange={handleSizeChange} >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" name="vege" type="radio" value="Vegetarian" checked={props.pizza ? props.pizza.vegetarian : false} onChange={handleVegeChange}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name="non-vege" type="radio" value="Not Vegetarian" checked={props.pizza ? !props.pizza.vegetarian : false} onChange={handleVegeChange} />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
