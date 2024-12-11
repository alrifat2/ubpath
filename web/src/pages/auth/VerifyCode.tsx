import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name='code-${index + 1}']`
      );
      nextInput?.focus();
    }
  };

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
            <div className="text-center">
              <p className="text-lg text-gray-600">
                We've sent a verification code to
              </p>
              <p className="font-medium text-xl text-gray-900 mt-1">{email}</p>
            </div>

            <div className="flex gap-3 justify-center">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name={`code-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              disabled={verificationCode.some((digit) => !digit)}
              onClick={() => navigate("/auth/onboarding")}
              className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg shadow-sm"
            >
              Verify
            </button>

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/auth/signin")}
                className="text-gray-500 text-sm hover:text-gray-700 focus:outline-none flex items-center gap-1 transition-colors duration-200"
              >
                Use a different email
              </button>
            </div>
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
