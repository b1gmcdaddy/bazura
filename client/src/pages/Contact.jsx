import React, { useState } from "react";
import Navbar from "../components/Navbar";
import contactbanner from "../assets/contactbanner.jpg";
import Footer from "../components/Footer";

const Contact = () => {
  const contactHeader = {
    backgroundImage: `url(${contactbanner})`,
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    height: "20vh",
    marginTop: "5rem",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Details submitted through contact form:", {
      name,
      email,
      msg,
    });
    setName("");
    setEmail("");
    setMsg("");
  };

  return (
    <>
      <Navbar bg="#282828" />

      <div
        className="relative flex items-center justify-center xs:h-[20vh]
    shadow-lg shadow-gray-500 mb-4"
        style={contactHeader}
      >
        <div className="max-w-[1240px] mx-auto absolute xs:px-10">
          <h1 className="text-white text-center tracking-wide md:text-3xl">
            WANT TO MAKE A RESERVATION? CALL <b>0967 243 9625</b>
          </h1>
        </div>
      </div>

      <div className="w-full bg-gray-50 md:py-[3rem] min-h-[70vh]">
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-2xl mb-4 tracking-wide md:text-4xl">
            CONTACT US
          </h2>
          <div className="w-[100px] h-[2.5px] mx-auto bg-green-600 rounded-md mt-4 mb-[2rem]"></div>
          <p className="md:mt-3 md:pt-3 md:text-lg xs:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-[3.5rem] grid grid-cols-2 gap-8">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                id="email"
                value={email}
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                placeholder="Message"
                value={msg}
                name="message"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                onChange={(e) => setMsg(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center mt-[2rem]">
              <button
                type="submit"
                className="bg-green-800 text-white py-2 px-4 hover:bg-green-700"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
