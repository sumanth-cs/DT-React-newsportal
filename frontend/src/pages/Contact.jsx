import React from "react";

const Contact = () => {
  return (
    <section className="contact-section py-16 bg-light flex justify-center items-center ">
      <div className="container text-center bg-white shadow-lg rounded-lg p-8 ">
        {/* Title */}
        <div className="row justify-center text-center mb-10">
          <div className="col-12">
            <h2 className="contact-title font-bold text-dark text-5xl mb-3">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              We'd love to hear from you! Reach out to us anytime.
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="row justify-center">
          <div className="col-lg-5 mx-auto">
            <div className="media contact-info flex flex-col items-center my-6">
              <span className="contact-info__icon mb-3">
                <i className="ti-home text-primary text-6xl" aria-label="Home"></i>
              </span>
              <div className="media-body">
                <h3 className="text-2xl font-bold">Address</h3>
                <p className="text-gray-600 text-lg">Indore, M.P</p>
              </div>
            </div>

            <div className="media contact-info flex flex-col items-center my-6">
              <span className="contact-info__icon mb-3">
                <i className="ti-tablet text-primary text-6xl" aria-label="Phone"></i>
              </span>
              <div className="media-body">
                <h3 className="text-2xl font-bold">Phone</h3>
                <p className="text-gray-600 text-lg">7068777069</p>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>

            <div className="media contact-info flex flex-col items-center my-6">
              <span className="contact-info__icon mb-3">
                <i className="ti-email text-primary text-6xl" aria-label="Email"></i>
              </span>
              <div className="media-body">
                <h3 className="text-2xl font-bold">Email</h3>
                <p className="text-gray-600 text-lg">dharmtantra@gmail.com</p>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
