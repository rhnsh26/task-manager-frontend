import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

import Card from "./Card";
import "./Home.scss";
// import colors from "../data/Colors";
import axios from "axios";

const addSvg = (
  <svg
    className="m-auto h-10"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const logutSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="1"
    strokeLinecap="butt"
    strokeLinejoin="arcs"
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
  </svg>
);

const closeSvg = (
  <svg
    id="close_btn"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#718096"
    strokeWidth="2"
    strokeLinecap="butt"
    strokeLinejoin="arcs"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// const deleteSvg = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#fff"
//     strokeWidth="1"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
//     <line x1="10" y1="11" x2="10" y2="17" />
//     <line x1="14" y1="11" x2="14" y2="17" />
//   </svg>
// );

// const editSvg = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="#fff"
//     strokeWidth="1"
//     strokeLinecap="butt"
//     strokeLinejoin="arcs"
//   >
//     <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />
//   </svg>
// );

class App extends Component {
  constructor(props) {
    super(props);
    const Token = localStorage.getItem("token");
    let loggedIn = true;
    if (Token === null) {
      loggedIn = false;
    }
    this.state = {
      title: "",
      description: "",
      newTitle: "",
      newDescription: "",
      todo: [],
      show: false,
      changeView: false,
      editMode: false,
      currTodo: undefined,
      loggedIn
    };

    this.createCard = this.createCard.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.logout = this.logout.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeView = this.changeView.bind(this);
    this.closeChange = this.closeChange.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  async componentWillMount() {
    const Token = localStorage.getItem("token");
    const response = await axios.get(
      "https://task-manager-b.herokuapp.com/todos",
      {
        headers: { Authorization: "Bearer " + Token }
      }
    );
    this.setState({ todo: response.data });
  }

  createCard(e) {
    e.preventDefault();
    if (this.state.title.trim() === "") {
      return null;
    }
    const Token = localStorage.getItem("token");
    axios
      .post(
        "https://task-manager-b.herokuapp.com/todo",
        {
          text: this.state.title,
          description: this.state.description
        },
        {
          headers: { Authorization: "Bearer " + Token }
        }
      )
      .then(res => {
        this.setState({
          todo: [...this.state.todo, res.data],
          show: false,
          title: "",
          description: "",
          color: "",
          changeView: false,
          editMode: false
        });
      });
  }

  async handleDelete() {
    const id = this.state.changeView ? this.state.currTodo._id : null;
    const Token = localStorage.getItem("token");
    await axios.delete(`https://task-manager-b.herokuapp.com/todos/${id}`, {
      headers: { Authorization: "Bearer " + Token }
    });
    this.setState({
      todo: this.state.todo.filter(n => n._id !== id),
      currTodo: null
    });
  }

  async handleEdit() {
    const id = this.state.currTodo._id;
    const text = this.state.newTitle;
    const description = this.state.newDescription;
    const Token = localStorage.getItem("token");
    const res = await axios.patch(
      `https://task-manager-b.herokuapp.com/todos/${id}`,
      { text, description },
      { headers: { Authorization: "Bearer " + Token } }
    );
    console.log(res);
    this.setState({
      todo: this.state.todo.map(n => {
        if (n._id === id) {
          let b = Object.assign({}, n, { text, description });
          return b;
        } else return n;
      }),
      loggedIn: false
    });
  }

  toggleEdit() {
    this.state.editMode
      ? this.setState({
          editMode: false
        })
      : this.setState({
          editMode: true,
          newTitle: this.state.currTodo.text,
          newDescription: this.state.currTodo.description
        });
  }

  async handleComplete() {
    const id = this.state.changeView ? this.state.currTodo._id : null;
    const Token = localStorage.getItem("token");
    await axios.patch(
      `https://task-manager-b.herokuapp.com/todos/${id}`,
      { completed: !this.state.currTodo.completed },
      { headers: { Authorization: "Bearer " + Token } }
    );
    this.setState({
      todo: this.state.todo.map(n => {
        if (n._id === id) {
          n.completed = true;
        }
      }),
      loggedIn: false
    });
  }

  handleInput(e) {
    e.target.value !== ""
      ? this.setState({ show: true })
      : this.setState({ show: false });
  }

  handleColor(color) {
    this.setState({
      color
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  closeChange() {
    this.setState({
      changeView: false,
      currTodo: undefined
    });
  }

  changeView(id) {
    if (!this.state.changeView) {
      this.setState({
        changeView: !this.state.changeView,
        currTodo: this.state.todo.find(n => n._id === id)
      });
    } else {
      this.setState({
        currTodo: this.state.todo.find(n => n._id === id)
      });
    }
  }

  logout() {
    const Token = localStorage.getItem("token");
    axios.get("https://task-manager-b.herokuapp.com/user/logout", {
      headers: { Authorization: "Bearer " + Token }
    });
    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
  }

  render() {
    let main = this.state.changeView ? "main-active" : "main-inactive";
    let sidebar = this.state.changeView ? "sidebar-active" : "sidebar-inactive";

    if (!this.state.loggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="flex m-0">
        <div className={`${main} w-full mt-10 mx-10`}>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl items-center">My tasks</h1>
            <button
              id="logout_btn"
              className=" items-center font-medium px-4 rounded-sm text-lg bg-gray-900 text-white text-center hover:bg-gray-800"
              onClick={this.logout}
            >
              <Link to="/login">Logout</Link>
            </button>
            <span id="logout_btn_sm" onClick={this.logout}>
              <Link to="/login">{logutSvg}</Link>
            </span>
          </div>
          <div id="create-todo" className="flex flex-col w-full mt-8">
            <h2 className="ml-2">Create Task</h2>
            <form
              autoComplete="off"
              onSubmit={this.createCard}
              className="flex flex-row relative my-4"
            >
              <input
                className="border-b-2 w-1/4 pl-2 focus:outline-none"
                type="text"
                name="title"
                placeholder="Add Title"
                onChange={e => {
                  this.handleChange(e);
                  this.handleInput(e);
                }}
                value={this.state.title}
              />
              {this.state.show && (
                <input
                  className="border-b-2 w-1/3 h-10 pl-2 pt-2 ml-4 focus:outline-none"
                  id="description-box"
                  type="text"
                  name="description"
                  placeholder="Add Description(Optional)"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              )}
              <button
                id="create-button"
                type="submit"
                className="h-10 w-10 ml-4 focus:outline-none rounded-full"
              >
                {addSvg}
              </button>
            </form>
          </div>

          <div className="mt-8">
            {this.state.todo.map((obj, index) => {
              return (
                <Card
                  key={obj._id}
                  i={index}
                  data={obj}
                  view={this.changeView}
                  remove={this.handleDelete}
                  edit={this.handleEdit}
                />
              );
            })}
          </div>
        </div>
        <div
          className={`${sidebar} flex flex-col justify-between bg-gray-900 pt-16 top-0 h-screen overflow-auto`}
        >
          <div className="flex justify-between w-full">
            <div className="flex flex-col  w-full">
              {this.state.changeView &&
                (this.state.editMode ? (
                  <React.Fragment>
                    <h2 className="text-gray-600 font-bold w-full">Title</h2>
                    <input
                      autoComplete="off"
                      className="mt-2 text-white focus:bg-gray-900 bg-gray-900 focus:outline-none border-b-2 border-gray-200 "
                      name="newTitle"
                      value={this.state.newTitle}
                      onChange={this.handleChange}
                    />
                    <h2 className="text-gray-600 font-bold mt-10">
                      Description
                    </h2>
                    <input
                      autoComplete="off"
                      className="mt-2 text-white focus:bg-gray-900 bg-gray-900 focus:outline-none border-b-2 border-gray-200 "
                      name="newDescription"
                      value={this.state.newDescription}
                      onChange={this.handleChange}
                    />
                    <div className="flex mt-4 w-full justify-between items-center">
                      <div
                        className="w-2/5 pt-1 border-2 h-10 text-center border-gray-200 rounded-sm text-white text-gray-200 hover:text-gray-800 hover:bg-gray-200 focus:outline-none cursor-pointer"
                        onClick={this.toggleEdit}
                      >
                        Cancel
                      </div>
                      <div
                        className="w-2/5 pt-1 border-2 h-10 text-center border-gray-200 rounded-sm text-white text-gray-200 hover:text-gray-800 hover:bg-gray-200 focus:outline-none cursor-pointer"
                        onClick={this.handleEdit}
                      >
                        Save
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h2 className="text-gray-600 font-bold">Title</h2>
                    <h2 className="text-gray-200 text-lg mt-2 flex">
                      {this.state.currTodo && this.state.currTodo.text}
                    </h2>
                    <h2 className="text-gray-600 font-bold mt-10">
                      Description
                    </h2>
                    <p className="text-gray-200 text-lg mt-2 ">
                      {this.state.currTodo && this.state.currTodo.description}
                    </p>
                    <h2 className="text-gray-600 font-bold mt-12">
                      Created On
                    </h2>
                    <p className="text-gray-200 text-md mt-2">
                      {this.state.currTodo &&
                        moment(this.state.currTodo.createdAt).format(
                          "h:mma, D MMM YY"
                        )}
                    </p>
                  </React.Fragment>
                ))}
            </div>
            {!this.state.editMode && (
              <div onClick={this.closeChange}>
                {this.state.changeView && closeSvg}
              </div>
            )}
          </div>

          {this.state.changeView && (
            <div className="w-full my-8 flex flex-col">
              <button
                className="h-10 my-4 bg-gray-800 rounded-sm w-full text-gray-200 hover:bg-gray-600 focus:outline-none"
                onClick={this.handleComplete}
              >
                {this.state.currTodo && this.state.currTodo.completed ? (
                  <p>Mark as Inompleted</p>
                ) : (
                  <p>Mark as Completed</p>
                )}
              </button>
              <button
                className="h-10 my-4 bg-gray-800 rounded-sm w-full text-gray-200 items-center hover:bg-gray-600 focus:outline-none"
                onClick={this.handleDelete}
              >
                {/* {deleteSvg} */}
                Delete
              </button>
              {this.state.currTodo && !this.state.currTodo.completed && (
                <button
                  className="h-10 my-4 bg-gray-800 rounded-sm w-full text-gray-200 items-center hover:bg-gray-600 focus:outline-none"
                  onClick={this.toggleEdit}
                >
                  {/* {editSvg} */}
                  <p>Edit</p>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

// {
//   /* <div className="Color-wrapper">
//               <div className="Color-pallet">
//                 {colors.map(n => {
//                   let SelectedClass = "";
//                   this.state.color === n.value
//                     ? (SelectedClass = "Color Selected-color")
//                     : (SelectedClass = "Color");
//                   return (
//                     <span
//                       className={SelectedClass}
//                       style={{ backgroundColor: n.value, borderColor: n.value }}
//                       onClick={this.handleColor.bind(null, n.value)}
//                       key={n.name}
//                     />
//                   );
//                 })}
//               </div>
//               <div />

//             </div> */
// }
