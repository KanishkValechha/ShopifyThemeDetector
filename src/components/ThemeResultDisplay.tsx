import { motion } from "framer-motion";
import { useState } from "react";

interface ThemeData {
  themeName: string;
  themeId: number;
  themeStoreId: number | null;
  schemaVersion: string;
  shopDomain: string | null;
}

interface ThemeResultDisplayProps {
  themeData: ThemeData;
}

const ThemeResultDisplay = ({ themeData }: ThemeResultDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 25 },
    },
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(themeData.themeName)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const renderResultItem = (label: string, content: React.ReactNode) => (
    <motion.div
      variants={item}
      className="group flex flex-col sm:flex-row sm:items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-transparent transition-colors duration:300"
    >
      <div className="font-medium text-gray-400 min-w-[140px] mb-1 sm:mb-0 flex items-center">
        <motion.div
          className="mr-2 w-1 h-1 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
        {label}:
      </div>
      {content}
    </motion.div>
  );

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 border border-gray-800/50 shadow-xl"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      variants={container}
      layoutId="resultCard"
    >
      <motion.div
        className="absolute inset-0 bg-emerald-900/5"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />

      <motion.div className="relative z-10" variants={container}>
        <div className="flex items-center mb-8">
          <motion.div
            className="w-1.5 h-7 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full mr-3"
            variants={item}
          />

          <motion.h2
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300"
            variants={item}
          >
            Theme Details
          </motion.h2>
        </div>

        <motion.div className="space-y-5" variants={container}>
          {renderResultItem(
            "Theme Name",
            <div className="flex items-center">
              <span className="text-emerald-300 font-semibold">
                {themeData.themeName}
              </span>
              <motion.span
                className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          )}

          {renderResultItem(
            "Theme ID",
            <span className="text-gray-200 font-mono px-2.5 py-1 rounded-md bg-gray-800/50 text-sm">
              {themeData.themeId}
            </span>
          )}

          {renderResultItem(
            "Schema Version",
            <span className="text-gray-200">{themeData.schemaVersion}</span>
          )}

          {themeData.shopDomain &&
            renderResultItem(
              "Shop Domain",
              <span className="text-gray-200">{themeData.shopDomain}</span>
            )}
        </motion.div>

        <motion.div
          className="mt-8 pt-5 border-t border-gray-800/50 flex justify-end relative"
          variants={item}
        >
          <motion.button
            className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            Copy Results
          </motion.button>

          {copied && (
            <motion.div
              className="absolute right-0 bottom-full mb-2 px-3 py-1 bg-emerald-900/80 text-emerald-200 text-xs rounded shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Copied!
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeResultDisplay;
