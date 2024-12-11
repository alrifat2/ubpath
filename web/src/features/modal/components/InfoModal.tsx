import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import logo from "../../../assets/logo.png";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white/80 backdrop-blur-md shadow-xl border border-white/20"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </motion.button>

            {/* Content */}
            <div className="p-6 space-y-8">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-3"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img src={logo} alt="UBPath Logo" className="w-8 h-8" />
                  <h1 className="text-4xl font-bold text-blue-600">UBPath</h1>
                </div>
                <p className="text-lg text-gray-600 italic">
                  Map your academic journey at UB
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <section>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Welcome to UBPath!
                  </h3>
                  <p className="text-gray-600">
                    UBPath is an intuitive course planning tool designed
                    specifically for University at Buffalo students. It helps
                    you visualize and navigate your academic journey through an
                    interactive course dependency graph.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Our Mission
                  </h3>
                  <p className="text-gray-600">
                    Inspired by the course flow sheet tools available to School
                    of Engineering and Applied Sciences (SEAS) students, we aim
                    to provide a similar experience for students across all
                    majors at UB. We believe every student deserves access to
                    intuitive course planning tools to help navigate their
                    academic journey.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    How to Use
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Each circle represents a course in your curriculum</li>
                    <li>Solid lines show prerequisites between courses</li>
                    <li>Dashed lines indicate corequisite relationships</li>
                    <li>Use mouse wheel or trackpad to zoom in/out</li>
                    <li>Click and drag the background to pan around</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Getting Started
                  </h3>
                  <p className="text-gray-600 mb-3">
                    You can start exploring course dependencies right away - no
                    account needed! However, creating an account unlocks
                    additional features:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Save your course plans across devices</li>
                    <li>Mark courses as completed to track your progress</li>
                    <li>
                      Get personalized course recommendations{" "}
                      <span className="text-blue-600">(coming soon!)</span>
                    </li>
                    <li>
                      Create multiple course plan scenarios{" "}
                      <span className="text-blue-600">(coming soon!)</span>
                    </li>
                  </ul>
                </section>

                <section className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Disclaimer
                  </h3>
                  <p className="text-sm text-gray-500">
                    UBPath is an independent project and is not affiliated with,
                    endorsed by, or sponsored by the University at Buffalo (UB)
                    or the State University of New York (SUNY) system. This tool
                    is created by students, for students, with the goal of
                    making course planning more accessible to all UB students.
                  </p>
                </section>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
