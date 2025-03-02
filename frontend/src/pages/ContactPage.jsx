import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gray-100 flex flex-col items-center p-8">
        <motion.h1 className="text-4xl font-bold mb-6 text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
          Contact Us
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
          <motion.div className="bg-white p-6 shadow-lg rounded-xl flex flex-col items-start space-y-4"
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
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
          </motion.div>

          <motion.form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-lg rounded-xl flex flex-col gap-4"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="grid grid-cols-2 gap-4">
              <input {...register("firstName", { required: true })} placeholder="First Name" className="input" />
              <input {...register("lastName", { required: true })} placeholder="Last Name" className="input" />
            </div>
            <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} placeholder="Email" className="input" />
            <input {...register("phone", { required: true })} placeholder="Phone Number" className="input" />
            <textarea {...register("message", { required: true })} placeholder="Write your message..." className="input h-24"></textarea>
            <button type="submit" className="btn">Send Message</button>
            {errors.email && <p className="text-red-500 text-sm">Invalid Email</p>}
            {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
