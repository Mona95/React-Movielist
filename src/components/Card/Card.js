import React, { Component } from "react";

export const Card = ({ movie }) => {
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={movie.Poster}
        alt={movie.Poster}
        width="200"
      />
      <div className="card-body">
        <p
          style={{ fontWeight: "bold" }}
          className="card-title"
        >{`${movie.Title}`}</p>
        <p
          style={{ fontSize: 12, color: "gray" }}
        >{`Year of release: ${movie.Year}`}</p>
      </div>
    </div>
  );
};
