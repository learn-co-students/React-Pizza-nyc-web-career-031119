import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const PIZZA_URL = "http://localhost:3000/pizzas";
class App extends Component {

  state = {
    pizzas: [],
    selectedPizza: null
  }

  componentDidMount() {
    fetch(PIZZA_URL)
    .then(res => res.json())
    .then(data => {
      this.setState({ pizzas: data })
    })
    .catch(error => {
      alert(error.message);
      console.log(error.message);
    })
  }

  selectPizza = (clickedPizza) => {
    this.setState({
      selectedPizza: clickedPizza
    });
  }

  changeTopping = (input) => {
    this.setState(prevState => {
      return {
        selectedPizza: {
          ...prevState.selectedPizza,
          topping: input
        }
      }
    })
  }

  changeSize = (input) => {
    this.setState(prevState => {
      return { selectedPizza: {
          ...prevState.selectedPizza,
          size: input
        }
      }
    })
  }

  changeVegeStatus = (input) => {
    this.setState(prevState => {
      return {
        selectedPizza: {
          ...prevState.selectedPizza,
          vegetarian: input
        }
      }
    })
  }

  submitChanges = () => {
    let formData = {
      ...this.state.selectedPizza
    };

    console.log("formData: ", formData);

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(`${PIZZA_URL}/${formData.id}`, configObj)
    .then(res => res.json())
    .then(pizza => {
      const updatedPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id === formData.id) {
          return {
            ...pizza,
            topping: formData.topping,
            size: formData.size,
            vegetarian: formData.vegetarian
          }
        } else {
          return pizza
        }
      });
      this.setState({ pizzas: updatedPizzas })
    })
    .catch(error => {
      alert(error.message);
      console.log(error.message);
    })
  }

  render() {
    console.log("pizzas: ", this.state.pizzas);
    console.log("selectedPizza: ", this.state.selectedPizza);
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.selectedPizza} changeTopping={this.changeTopping} changeSize={this.changeSize} changeVegeStatus={this.changeVegeStatus} submitChanges={this.submitChanges} />
        <PizzaList pizzas={this.state.pizzas} selectPizza={this.selectPizza} />
      </Fragment>
    );
  }
}

export default App;
