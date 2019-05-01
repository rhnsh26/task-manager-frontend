import React, { Component } from "react";
import data from "./data/Data";
import Card from "./component/Card";
import "./App.scss";
import colors from "./data/Colors";
//import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      color: "",
      data
    };
    // this.componentDidMount(){
    //   let data = this.login();
    //   this.setState({
    //     data
    //   })

    // }
    this.createCard = this.createCard.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  // async login(){
  //   let token = await axios.post('/user/login',{
  //     email:'rhnsh26@gmail.com',
  //     password:'buttowski'
  //   });
  //   let dump = await axios.get('/todos',{
  //     headers:{
  //       Authorization:'Bearer '+token
  //     }
  //   });
  //   this.setState({
  //     data:
  //   })

  // }
  createCard() {
    this.state.title.trim() !== "" &&
      this.setState({
        title: "",
        description: "",
        color: "",
        show: false,
        data: [
          ...this.state.data,
          {
            color: this.state.color,
            title: this.state.title,
            description: this.state.description,
            date: Date.now()
          }
        ]
      });
  }
  handleColor(color) {
    this.setState({
      color
    });
  }
  handleDelete(i) {
    this.setState({
      data: [...this.state.data.slice(0, i), ...this.state.data.slice(i + 1)]
    });
  }
  handleInput(title) {
    title.length > 0
      ? this.setState({ show: true })
      : this.setState({ show: false, color: "" });
    this.setState({ title });
  }
  render() {
    return (
      <div className="App-wrapper">
        <div className="Create-todo">
          <input
            className="Title-box"
            type="text"
            placeholder="Add Title"
            onChange={e => this.handleInput(e.target.value)}
            value={this.state.title}
          />

          <div
            className="Hidden-box"
            style={{ display: this.state.show ? "block" : "none" }}
          >
            <textarea
              className="Discription-box"
              type="text"
              placeholder="Add Description"
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
              value={this.state.description}
            />
            <div className="Color-wrapper">
              <div className="Color-pallet">
                {colors.map(n => {
                  let SelectedClass = "";
                  this.state.color === n.value
                    ? (SelectedClass = "Color Selected-color")
                    : (SelectedClass = "Color");
                  return (
                    <span
                      className={SelectedClass}
                      style={{ backgroundColor: n.value, borderColor: n.value }}
                      onClick={this.handleColor.bind(null, n.value)}
                      key={n.name}
                    />
                  );
                })}
              </div>
              <div />
              <button className="Create-button" onClick={this.createCard}>
                Create New
              </button>
            </div>
          </div>
        </div>

        <div className="Card-wrapper">
          {this.state.data.map((n, index) => (
            <Card
              key={index}
              i={index}
              data={n}
              state={this.state}
              colors={colors}
              action={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
