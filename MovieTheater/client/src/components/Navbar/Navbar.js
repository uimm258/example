import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="Navbar">
          <ul id="nav">
            <li><a href="#AboutUs">About Us</a></li>
            <li><a href="#Home">Home</a></li>
            <li><a href="#ContactUs">Contact Us</a></li>
            <li><Link to="/login">Admin Login</Link></li>
          </ul>
        </div>

        <section className="Navbar_info">
          <div id="AboutUs">
            <h1>About Us：</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris egestas purus convallis orci porta, ac fringilla erat egestas. In hac habitasse platea dictumst. Aenean ac nisi a lectus egestas efficitur id et velit. Praesent vel diam vitae sem viverra interdum sit amet at erat. Nunc elementum porttitor nibh, viverra finibus sapien interdum a. Curabitur auctor porttitor porta. Nam sapien elit, ultrices ut efficitur non, vehicula et eros. Curabitur auctor mi non tristique imperdiet. Aenean tortor augue, placerat eget mi vel, maximus luctus mi. Duis viverra pulvinar dui efficitur placerat. Proin molestie viverra scelerisque. Quisque rhoncus imperdiet quam, dignissim tempor tellus luctus nec.</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div id="Home">
            <h1>Home：</h1>
            <p>Nullam pulvinar pharetra efficitur. Duis faucibus, odio vitae condimentum scelerisque, dolor magna sollicitudin dolor, id ultricies leo ipsum sed mauris. Quisque lobortis eleifend velit, sit amet posuere metus. Sed in auctor odio. Integer pretium sollicitudin neque, non semper orci eleifend nec. Ut sit amet venenatis massa. Maecenas maximus vitae ligula sed posuere. Nulla sit amet lorem ac leo volutpat rhoncus sed vitae est. Donec ex magna, porta vulputate ornare ac, ultrices in nunc.</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div id="ContactUs">
            <h1>Contact Us: </h1>
            <p>Maecenas non purus sed diam gravida sollicitudin. Fusce id pellentesque odio. Phasellus rhoncus leo vitae molestie porttitor. Suspendisse potenti. Integer pharetra diam sapien, quis malesuada augue volutpat id. Phasellus sed metus blandit, feugiat ante et, hendrerit quam. Vestibulum sit amet neque lacus. Nunc ligula ipsum, blandit vel tellus ac, malesuada blandit justo. Etiam mattis elit id enim efficitur, id egestas velit hendrerit. Suspendisse enim nibh, porttitor id accumsan nec, egestas at lectus. Sed posuere posuere laoreet.</p>
          </div>
        </section>
      </div>
    );
  }
}