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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center flex-1 p-8 bg-gray-100">
        <motion.h1
          className="mb-6 text-4xl font-bold text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>

        <div className="grid w-full max-w-5xl gap-10 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            className="flex flex-col items-start p-6 space-y-4 bg-white shadow-lg rounded-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <div className="flex items-center gap-3 text-gray-600">
              <FaPhoneAlt className="text-blue-600" /> <span>+99 99999 99999</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaEnvelope className="text-blue-600" /> <span>sportx@support.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaMapMarkerAlt className="text-blue-600" /> <span>Camp Area, Bhuj - 370001</span>
            </div>
          </motion.div>

          {/* Contact Form */}
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
                  className="input"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Last Name"
                  className="input"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
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
                className="input"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
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
                className="input"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <textarea
                {...register("message", { required: "Message cannot be empty" })}
                placeholder="Write your message..."
                className="h-24 input"
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="py-2 text-white transition bg-blue-600 rounded-md btn hover:bg-blue-700"
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
