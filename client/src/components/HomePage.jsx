import React from 'react';
import './HomePage.css';
import { Link, Redirect, Route } from 'react-router-dom';

export default function HomePage(props) {
  return (
    <div className="containerLogo">
      <img className="logo" src={require("../img/foodfavLogo.png")} />
    </div>
    )
  }
