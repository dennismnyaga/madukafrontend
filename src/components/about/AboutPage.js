import "./AboutPage.css";
import shopi from "../images/perso.png";

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const AboutPage = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [expanded, setExpanded] = useState({});

  const questions = [
    {
      question: "What is Maduka?",
      answer:
        "Maduka is an online marketplace where you can find a wide range of products.",
    },
    {
      question: "How do I make a purchase on Maduka?",
      answer:
        "To make a purchase on Maduka, simply add the desired items to your cart and proceed to checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return any product within 30 days of purchase for a full refund.",
    },
    {
      question: "Do you offer fast shipping?",
      answer:
        "Yes, we offer fast shipping options to ensure that you receive your purchases as soon as possible.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by emailing support@maduka.com or by using the contact form on our website.",
    },
  ];
  return (
    <div>
      {isDesktopOrLaptop && (
        <div>
          <div className="about">
            <div className="about-left">
              <h1>About MadukaOnline</h1>
              <span>Description</span>
              <p>
              MadukaOnline is the premier platform for retailers looking to reach customers and grow 
              their business. Our website allows you to easily create your own online shop, 
              where you can showcase your products and reach customers from all over. With MadukaOnline,
               you have the freedom to manage your shop from anywhere, at any time.
                <br />
                <br />
                Our user-friendly interface makes it easy to upload and manage your products, track sales
                 and customer inquiries, and much more. And with our advanced
                 security measures, you can rest assured that your shop and information are always safe.
                <br />
                <br />
                At MadukaOnline, our mission is to help retailers like you succeed and grow. So why wait? Create your shop 
                today and start reaching more customers with MadukaOnline!
                <br />
                <span className="hashtags">#SellMoreWithMaduka #OnlineRetailSuccess #GrowYourBusiness</span>
              </p>
              <a href="https://twitter.com/madukaonline">Leave a feedback</a>
            </div>
            <div className="about-right">
              <img src={shopi}  alt="about"/>
            </div>
          </div>
          <div className="about asked">
            <h2>Frequently Asked Questions</h2>
            <ul>
              {questions.map((question, index) => (
                <li key={index}>
                  <h3 style={{ borderBottom: "1px solid #ccc" }}>
                    {question.question}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setExpanded({
                          ...expanded,
                          [index]: !expanded[index],
                        })
                      }
                    >
                      {expanded[index] ? "-" : "+"}
                    </span>
                  </h3>
                  {expanded[index] && <p>{question.answer}</p>}
                </li>
              ))}
            </ul>
            <button className="contact-us">CONTACT US</button>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div>
          <div className="about-mobile">
            <div className="about-left-mobile">
              <h1>About MadukaOnline</h1>
              <span>Description</span>
              <p>
              MadukaOnline is the premier platform for retailers looking to reach customers and grow 
              their business. Our website allows you to easily create your own online shop, 
              where you can showcase your products and reach customers from all over. With MadukaOnline,
               you have the freedom to manage your shop from anywhere, at any time.
                <br />
                <br />
                Our user-friendly interface makes it easy to upload and manage your products, track sales
                 and customer inquiries, and much more. And with our advanced
                 security measures, you can rest assured that your shop and information are always safe.
                <br />
                <br />
                At MadukaOnline, our mission is to help retailers like you succeed and grow. So why wait? Create your shop 
                today and start reaching more customers with MadukaOnline!
                <br />
                <span className="hashtags">#SellMoreWithMaduka #OnlineRetailSuccess #GrowYourBusiness</span>
              </p>
              <a href="https://twitter.com/madukaonline">Leave a feedback</a>
            </div>
            {/* <div className="about-right">
            <img src={shopi} />
          </div> */}
          </div>
          <div className="about-mobile asked">
            <div className="asked-mobile">
              <h2>Frequently Asked Questions</h2>
              <ul>
                {questions.map((question, index) => (
                  <li key={index}>
                    <h3 style={{ borderBottom: "1px solid #ccc" }}>
                      {question.question}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setExpanded({
                            ...expanded,
                            [index]: !expanded[index],
                          })
                        }
                      >
                        {expanded[index] ? "-" : "+"}
                      </span>
                    </h3>
                    {expanded[index] && <p>{question.answer}</p>}
                  </li>
                ))}
              </ul>
              <div className="mobile-link-con">
                <button className="contact-us-mobile">CONTACT US</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
