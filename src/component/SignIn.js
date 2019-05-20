import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./SignIn.scss";

class SignIn extends Component {
  constructor(props) {
    super(props);
    const Token = localStorage.getItem("token");
    let loggedIn = true;
    if (Token === null) {
      loggedIn = false;
    }
    this.state = {
      email: "",
      password: "",
      loggedIn
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
    const res = await axios.post(
      "http://ec2-54-172-142-131.compute-1.amazonaws.com:8080/user/login",
      {
        email: this.state.email,
        password: this.state.password
      }
    );
    if (res.status == "200") {
      localStorage.setItem("token", res.data.token);
      this.setState({ loggedIn: true });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container m-auto ">
        <div className="flex flex-col m-auto max-w-xs shadow-md bg-grey-lightest mt-24 px-6 py-4 rounded">
          <div className="flex flex-col my-4">
            <h1 className="mb-2">Sign In</h1>
          </div>
          <label className="block text-grey text-sm font-bold md:text-left mb-2 md:mb-1 pr-4">
            Email Id
          </label>
          <input
            className="h-8 p-2 bg-grey-lighter focus:bg-white focus:border-indigo border border-grey-lighter focus:outline-none text-grey-darker rounded-sm mb-4 text-sm"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email Id "
          />
          <label className="block text-grey text-sm font-bold md:text-left mb-2 md:mb-1 pr-4">
            Password
          </label>
          <input
            className="h-8 p-2 bg-grey-lighter focus:bg-white focus:border-indigo border border-grey-lighter focus:outline-none text-grey-darker rounded-sm mb-4 text-sm"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button
            className="h-10 font-semibold bg-indigo-dark hover:bg-indigo-darker text-white mb-6 mt-2 rounded-sm"
            onClick={this.onSubmit}
          >
            Submit
          </button>
          <p className="h-8 pl-8">
            new user ?{" "}
            <Link to="/register" className="font-bold text-indigo">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;
