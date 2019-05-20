import React, { Component } from "react";

import "./Card.scss";

const box = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);

const completedBox = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="1"
    strokeLinecap="butt"
    strokeLinejoin="arcs"
  >
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

class Card extends Component {
  constructor(props) {
    super(props);
    const { i, data } = props;
    const bgColor = "grey";
    this.state = {
      title: "",
      description: "",
      bgColor,
      data,
      hover: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      title: "",
      description: ""
    });
    this.props.view(this.props.data._id);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let textComp = this.props.data.completed
      ? "line-through text-gray-600"
      : "text-gray-800";
    return (
      <div
        className="my-2 py-4 hover:bg-gray-200 cursor:move focus:bg-gray-400"
        onClick={this.toggle}
      >
        <div className="font-black flex ml-2 items-center">
          {this.props.data.completed ? (
            <span>{completedBox}</span>
          ) : (
            <span>{box}</span>
          )}
          <div className="ml-4 flex">
            <h2 className={`${textComp} text-lg font-medium `}>
              {this.state.data.text}
            </h2>
            <p
              className={`${textComp} text-lg font-light ml-4 align-text-bottom`}
            >
              {this.state.data.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

// {this.state.editMode ? (
//   <React.Fragment>
//     <form>
//       <input
//         className="border-b-2 w-1/3 px-2 ml-4 focus:outline-none"
//         type="text"
//         name="title"
//         value={this.state.title}
//         onChange={this.handleChange}
//         placeholder="title"
//       />
//       <input
//         className="border-b-2 w-1/3 px-2 ml-4 focus:outline-none"
//         type="text"
//         name="description"
//         value={this.state.description}
//         onChange={this.handleChange}
//         placeholder="description"
//       />
//       <button
//         type="submit"
//         className="px-2 ml-4"
//         onClick={this.props.edit.bind(
//           this,
//           this.props.data._id,
//           this.state.title,
//           this.state.description
//         )}
//       >
//         Save
//       </button>
//     </form>
//   </React.Fragment>
