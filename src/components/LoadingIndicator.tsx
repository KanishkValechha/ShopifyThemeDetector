import { motion } from "framer-motion";

function LoadingIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 border-3 border-gray-200 border-t-emerald-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="mt-6 text-center"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.p
          className="text-lg font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Analyzing Shopify Store
        </motion.p>
        <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
      </motion.div>
    </motion.div>
  );
}

export default LoadingIndicator;
