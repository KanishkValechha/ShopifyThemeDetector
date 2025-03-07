import React, { useState } from "react";
import { motion } from "framer-motion";

interface ThemeDetectorFormProps {
  onSubmit: (url: string) => void;
}

function ThemeDetectorForm({ onSubmit }: ThemeDetectorFormProps) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative flex flex-col sm:flex-row gap-3 mb-12"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="relative flex-1 group">
        <div className="absolute -inset-0.5 rounded-xl overflow-hidden">
          <motion.div
            className={`absolute inset-0 ${
              isFocused
                ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600"
                : "bg-gray-700"
            }`}
            animate={{
              opacity: isFocused ? 1 : 0.5,
              backgroundPosition: isFocused
                ? ["0% center", "100% center"]
                : "0% center",
            }}
            transition={{
              duration: isFocused ? 3 : 0.3,
              repeat: isFocused ? Infinity : 0,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative flex bg-gray-900 rounded-xl overflow-hidden">
          {/* URL Icon */}
          <div className="flex items-center justify-center pl-4">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-emerald-500 opacity-80"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ scale: isFocused ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </motion.svg>
          </div>

          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter a Shopify store URL (e.g., https://shop.in-n-out.com/)"
            className="flex-1 px-4 py-4 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-0 z-10"
            required
          />
        </div>
      </div>

      <motion.button
        type="submit"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative px-7 py-4 overflow-hidden rounded-xl font-medium text-white shadow-lg"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"
          animate={{
            backgroundPosition: isHovered
              ? ["0% center", "100% center"]
              : "0% center",
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        />

        <motion.span
          className="relative z-10 flex items-center justify-center gap-2"
          animate={{ x: isHovered ? [0, 2, 0] : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Detect Theme
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        </motion.span>
      </motion.button>
    </motion.form>
  );
}

export default ThemeDetectorForm;
