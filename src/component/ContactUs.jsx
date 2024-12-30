import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContactUs = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

  const sendEmail = (e) => {
    e.preventDefault();

    const userPhone = e.target.user_phone.value;
    const userEmail = e.target.user_email.value;
    const bookName = e.target.book_name.value;

    // Validation: At least one contact and book name are required
    if (!userPhone && !userEmail) {
      toast.error("Please provide either a phone number or an email.", {
        position: "top-center",
      });
      return;
    }

    if (!bookName) {
      toast.error("Please provide a book name.", { position: "top-center" });
      return;
    }

    // Set submitting state to true
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_e13flqt", // Replace with your Service ID
        "template_iupjely", // Replace with your Template ID
        form.current,
        "HU1CIit-xDCNnipwv" // Replace with your Public Key
      )
      .then(
        () => {
          toast.success("Email sent successfully!", {
            position: "top-center",
          }); // Show success notification
          form.current.reset(); // Clear the form fields
        },
        (error) => {
          toast.error(`Failed to send email: ${error.text}`, {
            position: "top-center",
          }); // Show error notification
        }
      )
      .finally(() => {
        setIsSubmitting(false); // Re-enable the form after submission
      });
  };

  return (
    <div className="w-[80%] md:w-[50%]  md:max-w-4xl mx-auto sm:mt-4 md:mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Form Header */}
      <h1 className="text-2xl font-bold text-center mb-6">Contact Us📔</h1>

      {/* Form */}
      <form
        ref={form}
        onSubmit={sendEmail}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 "
      >
        {/* Name Field */}
        <div>
          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="user_phone"
            id="user_phone"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
            disabled={isSubmitting}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
        </div>

        {/* Book Name Field */}
        <div>
          <label htmlFor="book_name" className="block text-sm font-medium text-gray-700">
            Book Name
          </label>
          <input
            type="text"
            name="book_name"
            id="book_name"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the book name"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Book Quantity Field */}
        <div>
          <label htmlFor="book_quantity" className="block text-sm font-medium text-gray-700">
            Book Quantity
          </label>
          <input
            type="number"
            name="book_quantity"
            id="book_quantity"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter book quantity"
            disabled={isSubmitting}
          />
        </div>

        {/* Message Field */}
        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your message"
            rows="4"
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 text-center">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Submitting...
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
