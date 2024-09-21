import "./Footer.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import config from "../../config";

const Footer = () => {
  const apiUrl = process.env.REACT_APP_NODE_ENV === 'production' ? config.production.apiUrl : config.development.apiUrl;  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${apiUrl}/createnewsletter/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.email);
      alert("Successfully Created Newsletter for " + data.email);
      setEmail("");
    } else if (response.status === 400) {
      const data = await response.json();
      console.log(data);
      alert(data);
    } else {
      throw new Error("Failed to subscribe");
    }
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="container">
          <div className="quick-links">
            <h3>QUICK LINKS</h3>
            <Link className="quicks" to="/">
              <p>Home</p>
            </Link>
            <Link className="quicks" to="/about">
              <p>About</p>
            </Link>
            <Link className="quicks" to="/">
              <p>Products</p>
            </Link>
            <Link className="quicks" to="/">
              <p>Categories</p>
            </Link>
          </div>
          <div className="find-us">
            <h3>FIND US</h3>
            <a className="quicks" href="tel: +254700200566">
              +254700200566
            </a>
            <p>Mombasa</p>
            <span className="social">
              <a href="https://www.facebook.com/www.madukaonline.co.ke">
                <FacebookIcon className="social-link fb" />
              </a>
              <a href="https://twitter.com/madukaonline">
                <TwitterIcon className="social-link tw" />
              </a>
              <a href="https://www.instagram.com/madukaonline1/">
                <InstagramIcon className="social-link ig" />
              </a>
            </span>
          </div>
          <div className="newsletter">
            <h3>NEWSLETTER</h3>
            <p>
              Subscribe to our newsletter and connect us on all social medial
              platforms
            </p>
            <form className="form-input" onSubmit={handleSubmit}>
              <div className="nesletter-entry">
                <input
                  className="new-input"
                  placeholder="subscribe here"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <SendIcon className="sendicon" onClick={handleSubmit} />
              </div>
            </form>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-foot">
          <p>
            MADUKA ONLINE &copy; {new Date().getFullYear()}. All Rights
            Researved. Terms of Use and Privacy Policy{" "}
          </p>
          <p className="">Developed By: <a className="developer" href="https://www.linkedin.com/in/dennis-muril-246715196/">Dennis</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
