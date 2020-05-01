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
        res.status === 200 &&
          this.setState({
            data: res.data.Search,
            loading: false,
          });
      });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <span>Loading Movie Lists ...</span>;
    }
    return (
      <div className="row">
        {data.map((data) => (
          <div className="col-sm-3">
            <Card key={data.imdbID} movie={data} />
          </div>
        ))}
      </div>
    );
  }
}
