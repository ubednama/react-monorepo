import { useState } from "react";
import contactUs from "../assets/contactUs.png";

const ContactUs = () => {
  const [contactUsForm, setContactUsForm] = useState({
    name: "",
    email: "",
    message: "",
    contactType: "say-hi", // Default selection
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactUsForm((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contactUsForm);
  };

  return (
    <div className="space-y-20">
      <hr className="w-16 border-[3.5px] border-figmaGreen mx-auto" />
      <div className="flex gap-10 items-center">
        <div className="bg-figmaGreen px-1.5 py-1 font-semibold text-4xl rounded-md">
          Contact Us
        </div>
        <div className="w-[25%] max-w-2xl text-gray-600 leading-tight">
          Contact with Us: Let's Discuss Your Digital Marketing Needs
        </div>
      </div>
      <div className="bg-zinc-100 px-24 py-20 rounded-[60px] flex items-center pr-0 border gap-40">
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div className="flex gap-8">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="contactType"
                id="say-hi"
                value="say-hi"
                checked={contactUsForm.contactType === "say-hi"}
                onChange={handleChange}
                className="size-6 accent-figmaGreen"
              />
              <label htmlFor="say-hi">Say Hi</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="contactType"
                id="get-quote"
                value="get-quote"
                checked={contactUsForm.contactType === "get-quote"}
                onChange={handleChange}
                className="size-6 accent-figmaGreen"
              />
              <label htmlFor="get-quote">Get a Quote</label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={contactUsForm.name}
                onChange={handleChange}
                className="mt-1.5 p-4 border border-black rounded-xl"
                placeholder="Name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                value={contactUsForm.email}
                onChange={handleChange}
                className="mt-1.5 p-4 border border-black rounded-xl"
                placeholder="Email"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message">Message*</label>
              <textarea
                id="message"
                name="message"
                value={contactUsForm.message}
                onChange={handleChange}
                className="mt-1.5 p-4 border border-black rounded-xl resize-none"
                placeholder="Message"
                rows="7"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-figmaDark text-white p-5 rounded-xl hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>
        <img src={contactUs} alt="Contact Us" className="pl-0 ml-0" />
      </div>
    </div>
  );
};

export default ContactUs;
