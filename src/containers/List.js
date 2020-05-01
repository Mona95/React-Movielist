import React, { Component } from "react";
import axios from "axios";
import { Card } from "../components/Card/Card";
import { OMDB_API_KEY } from "../../constants";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`http://www.omdbapi.com/?s=batman&apikey=${OMDB_API_KEY}`)
      .then((res) => {
        console.log(res.data.Search);
      });
  }

  render() {
    return <Card />;
  }
}
