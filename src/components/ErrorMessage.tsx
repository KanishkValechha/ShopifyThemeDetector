import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <motion.div
      className="relative overflow-hidden bg-black/60 rounded-lg shadow-lg backdrop-blur-sm"
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-red-400 via-red-600 to-red-400"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      />

      <motion.div
        className="absolute inset-0 bg-red-900/10"
        animate={{
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />

      <div className="p-6 relative">
        <div className="flex">
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <svg
              className="h-6 w-6 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          <div className="ml-4">
            <motion.p
              className="text-lg font-semibold text-gray-200 mb-1"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Error Detected
            </motion.p>

            <motion.p
              className="text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {message}
            </motion.p>
          </div>
        </div>

        <motion.div
          className="mt-4 flex items-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Try checking the URL and make sure it's a valid Shopify store
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ErrorMessage;
