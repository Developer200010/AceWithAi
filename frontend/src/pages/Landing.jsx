import { Link } from "react-router-dom";
import { FiCode, FiUser, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import "../App.css"
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center w-full p-2 max-w-7xl mx-auto">
        <div className="w-20 h-20 flex items-center">
          <img
            src="/logo.svg"
            alt="logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blck font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-600 transition"
          >
            Register
          </Link>
        </nav>
      </header>


      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 mt-12 max-w-7xl mx-auto">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight gradient-text">
            Master Your Interviews <br className="hidden md:block" /> with AI Guidance
          </h2>
          <p className="mt-6 text-white text-lg md:text-xl">
            Practice real-world interview questions, get instant AI feedback, and track your growth. Build confidence and ace every interview!
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.pinimg.com/736x/8a/13/43/8a1343f2a9a00798f48b7221db748634.jpg"
            alt="AI Interview Illustration"
            className="rounded-2xl shadow-lg max-h-[400px] object-cover"
          />
        </motion.div>
      </section>


      {/* Features Section */}
      <section className="mt-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h3 className="text-white text-3xl font-bold mb-12">Why Choose Us</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FiCode className="text-white mx-auto mb-4" size={48} />,
              title: "Real Questions",
              desc: "Curated interview questions from beginner to expert level."
            },
            {
              icon: <FiUser className="text-white mx-auto mb-4" size={48} />,
              title: "AI Feedback",
              desc: "Receive instant, actionable feedback on your answers."
            },
            {
              icon: <FiCheckCircle className="text-white mx-auto mb-4" size={48} />,
              title: "Track Progress",
              desc: "Monitor improvement and stay on top of your preparation."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="border-2 border-l-blue-600 border-b-pink-600 rounded-xl p-8 shadow-lg hover:shadow-2xl transition text-white font-extrabold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {feature.icon}
              <h4 className="font-bold text-xl mb-2 text-white">{feature.title}</h4>
              <p className="text-lx text-white">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call-to-action Section */}
      <motion.section
        className="mt-20 bg-black border-2 border-l-blue-600 border-b-pink-600 border-r-blue-600 border-t-white font-extrabold space-x-1 py-16 text-center rounded-t-3xl shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold mb-4 text-white">Ready to Start?</h3>
        <p className=" text-xl text-white mb-6">Join thousands of developers preparing for interviews the smart way.</p>
        <Link
          to="/register"
          className="p-3 bg-white text-black text-lg font-bold rounded-lg hover:cursor-pointer transition"
        >
          Started Now
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="mt-12 p-6 text-center text-white border-t border-white/20">
        © {new Date().getFullYear()} AI Interview Prep. All rights reserved.
      </footer>
    </div>
  );
}
