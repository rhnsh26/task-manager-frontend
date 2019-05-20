import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async onSubmit() {
    const response = await axios.post(
      "https://task-manager-b.herokuapp.com/user",
      {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    );
    console.log(response);
  }

  render() {
    return (
      <div className="container m-auto">
        <div className="flex flex-col m-auto max-w-xs shadow-md bg-gray-100 mt-24 px-6 py-4 rounded">
          <div className="flex flex-col my-4">
            <h1 className="mb-2">Sign Up</h1>
          </div>
          <label className="block text-grey text-sm font-bold md:text-left mb-2 md:mb-1 pr-4">
            Full Name
          </label>
          <input
            className="h-8 p-2 bg-gray-200 focus:bg-white focus:border-indigo-400 border border-gray-200 focus:outline-none text-gray-800 rounded-sm mb-4 text-sm"
            name="name"
            type="text"
            value={this.state.name}
            placeholder="name"
            onChange={this.handleChange}
          />
          <label className="block text-grey text-sm font-bold md:text-left mb-2 md:mb-1 pr-4">
            Email Id
          </label>
          <input
            className="h-8 p-2 bg-gray-200 focus:bg-white focus:border-indigo-400 border border-gray-200 focus:outline-none text-gray-800 rounded-sm mb-4 text-sm"
            name="email"
            type="text"
            value={this.state.email}
            placeholder="email"
            onChange={this.handleChange}
          />
          <label className="block text-grey text-sm font-bold md:text-left mb-2 md:mb-1 pr-4">
            Password
          </label>
          <input
            className="h-8 p-2 bg-gray-200 focus:bg-white focus:border-indigo-400 border border-gray-200 focus:outline-none text-gray-800 rounded-sm mb-4 text-sm"
            name="password"
            type="text"
            value={this.state.password}
            placeholder="password"
            onChange={this.handleChange}
          />
          <button
            className="h-10 font-semibold bg-indigo-600 hover:bg-indigo-800 text-white mb-6 mt-2 rounded-sm"
            onClick={this.onSubmit}
          >
            Submit
          </button>
          <p lassName="h-8 pl-8">
            already a user?{" "}
            <Link to="/" className="font-bold text-indigo-400">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignUp;
