import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Building2,
} from "lucide-react";
import {
  majors,
  schools,
  minors,
  type Program,
  type School,
} from "../../utils/academic-programs";

type OnboardingStep = "name" | "school" | "major";

const getPreviousStep = (currentStep: OnboardingStep): OnboardingStep => {
  switch (currentStep) {
    case "major":
      return "school";
    case "school":
      return "name";
    default:
      return "name";
  }
};

export default function UserOnboarding() {
  const [step, setStep] = useState<OnboardingStep>("name");
  const [firstName, setFirstName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<Program | null>(null);
  const [selectedMinor, setSelectedMinor] = useState<Program | null>(null);
  const [showMinorSelect, setShowMinorSelect] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const getProgress = () => {
    switch (step) {
      case "name":
        return 33;
      case "school":
        return 66;
      case "major":
        return 100;
    }
  };

  const renderStepIndicator = () => {
    const stepNumber = step === "name" ? 1 : step === "school" ? 2 : 3;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-block mb-6 px-4 py-1.5 bg-blue-50 rounded-full"
      >
        <span className="text-sm font-medium text-blue-600">
          Step {stepNumber} of 3
        </span>
      </motion.div>
    );
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.key === "Enter") {
      switch (step) {
        case "name":
          if (firstName.trim()) {
            setStep("school");
          }
          break;
        case "school":
          if (selectedSchool) {
            setStep("major");
          }
          break;
        case "major":
          if (selectedMajor) {
            // Handle completion
            console.log("Complete setup");
          }
          break;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#fdfbf8] overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${getProgress()}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <main className="h-full flex flex-col items-center justify-center p-4">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="w-full max-w-xl"
        >
          {step === "name" ? (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                {renderStepIndicator()}
                <h2 className="text-4xl font-bold text-gray-900">
                  What's your first name?
                </h2>
                <p className="text-lg text-gray-600">
                  We'll use this to personalize your experience
                </p>
              </div>

              <div className="space-y-6">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="block w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  placeholder="Enter your first name"
                  autoFocus
                />

                <div className="space-y-8">
                  <button
                    onClick={() => setStep("school")}
                    disabled={!firstName.trim()}
                    className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-sm"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <p className="text-sm text-center text-gray-500">
                    ps: this is an one time thing for new users, im sorry :(
                  </p>
                </div>
              </div>
            </div>
          ) : step === "school" ? (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                {renderStepIndicator()}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-900"
                >
                  Welcome, {firstName} 👋
                </motion.h2>
                <p className="text-lg text-gray-600">
                  Select your school or college
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <select
                      value={selectedSchool?.shortName || ""}
                      onChange={(e) => {
                        const school = schools.find(
                          (s) => s.shortName === e.target.value
                        );
                        setSelectedSchool(school || null);
                      }}
                      onKeyPress={handleKeyPress}
                      className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none"
                    >
                      <option value="">Select your school...</option>
                      {schools.map((school) => (
                        <option key={school.shortName} value={school.shortName}>
                          {school.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setStep("major")}
                  disabled={!selectedSchool}
                  className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-sm"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="flex justify-center mt-4">
                  {step !== "name" && (
                    <button
                      onClick={() => setStep(getPreviousStep(step))}
                      className="text-gray-500 text-sm hover:text-gray-700 focus:outline-none flex items-center gap-1 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Go back
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-3">
                {renderStepIndicator()}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gray-900"
                >
                  Choose Your Major
                </motion.h2>
                <p className="text-lg text-gray-600">
                  Select your major from{" "}
                  <span className="font-bold">{selectedSchool?.name}</span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <select
                      value={selectedMajor?.name || ""}
                      onChange={(e) => {
                        const major = majors.find(
                          (m) => m.name === e.target.value
                        );
                        setSelectedMajor(major || null);
                      }}
                      onKeyPress={handleKeyPress}
                      className="block w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none"
                    >
                      <option value="">Select a major...</option>
                      {majors
                        .filter((m) => m.school === selectedSchool?.shortName)
                        .map((major) => (
                          <option key={major.name} value={major.name}>
                            {major.name} {major.degree}
                            {major.concentration
                              ? ` - ${major.concentration}`
                              : ""}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => setShowMinorSelect(!showMinorSelect)}
                    className="text-blue-600 text-base hover:underline focus:outline-none"
                  >
                    {showMinorSelect
                      ? "Remove minor"
                      : "Add a minor (optional)"}
                  </button>
                </div>

                {showMinorSelect && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <label className="block text-lg font-medium text-gray-700">
                      Select your minor
                    </label>
                    <select
                      value={selectedMinor?.name || ""}
                      onChange={(e) => {
                        const minor = minors.find(
                          (m) => m.name === e.target.value
                        );
                        setSelectedMinor(minor || null);
                      }}
                      className="block w-full px-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm appearance-none"
                    >
                      <option value="">Select a minor...</option>
                      {minors.map((minor) => (
                        <option key={minor.name} value={minor.name}>
                          {minor.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                <button
                  disabled={!selectedMajor}
                  className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg shadow-sm"
                >
                  Complete Setup
                </button>

                <div className="flex justify-center mt-4">
                  {step !== "name" && (
                    <button
                      onClick={() => setStep(getPreviousStep(step))}
                      className="text-gray-500 text-sm hover:text-gray-700 focus:outline-none flex items-center gap-1 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Go back
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
