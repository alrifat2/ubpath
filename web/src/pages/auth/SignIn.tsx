import { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-[#fdfbf8] overflow-hidden">
      <main className="h-full flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl space-y-8"
        >
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <img src={logo} alt="UBPath Logo" className="w-8 h-8" />
                <h1 className="text-4xl font-bold text-blue-600">UBPath</h1>
              </div>
              <p className="text-lg text-gray-600 italic">
                Map your academic journey at UB
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <button
              onClick={() => navigate("/auth/verify", { state: { email } })}
              disabled={!email.includes("@")}
              className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg shadow-sm"
            >
              Continue with Email
            </button>
          </div>

          <p className="text-sm text-center text-gray-600">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
}
