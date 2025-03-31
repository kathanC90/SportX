import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Submitted", data);
    alert("Message sent successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center flex-1 p-8">
        <motion.h1
          className="mb-6 text-4xl font-bold text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>

        <div className="grid w-full max-w-5xl gap-10 md:grid-cols-2">
          {/* Contact Info Section */}
          <motion.div
            className="flex flex-col items-start p-6 space-y-4 bg-white shadow-lg rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
            <div className="flex items-center gap-3 text-gray-600">
              <FaPhoneAlt className="text-blue-600" /> <span>+99 99999 99999</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaEnvelope className="text-blue-600" /> <span>sportx@support.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaMapMarkerAlt className="text-blue-600" /> <span>Camp Area, Bhuj - 370001</span>
            </div>
            <iframe
              className="w-full h-48 mt-4 rounded-lg shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.002053052177!2d70.06517077428944!3d23.251678810878303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be045c2d62e72e7%3A0x7bcdfe7a55d3e5c1!2sCamp%20Area%2C%20Bhuj!5e0!3m2!1sen!2sin!4v1649505532421!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>

          {/* Contact Form Section */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="First Name"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                placeholder="Phone Number"
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register("message", { required: "Message cannot be empty" })}
                placeholder="Write your message..."
                className="w-full h-24 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
