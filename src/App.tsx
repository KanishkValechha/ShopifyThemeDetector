import { useState } from "react";
import ThemeDetectorForm from "./components/ThemeDetectorForm";
import ThemeResultDisplay from "./components/ThemeResultDisplay";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";
import { detectShopifyTheme, ThemeDetectionResult } from "./themeDetector";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [themeData, setThemeData] = useState<ThemeDetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDetectTheme = async (url: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setThemeData(null);

    try {
      const data = await detectShopifyTheme(url);
      setThemeData(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-900/10 via-transparent to-transparent opacity-70"></div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-emerald-900/5 to-transparent"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto relative"
      >
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-[0_10px_40px_rgba(16,185,129,0.1)] p-7 md:p-10 border border-gray-800/50 backdrop-blur-sm overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="absolute inset-px rounded-3xl overflow-hidden">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            ></motion.div>
          </div>

          <div className="relative z-10">

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6"
                animate={{ width: ["0%", "40px", "80px"] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              ></motion.div>

              <motion.h1
                className="text-4xl font-bold text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                Shopify Theme Detector
              </motion.h1>

              <motion.p
                className="text-center text-gray-400 mb-10 max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Analyze any Shopify store and identify its theme with precision
              </motion.p>
            </motion.div>

            <ThemeDetectorForm onSubmit={handleDetectTheme} />

            <AnimatePresence mode="wait">
              {loading && <LoadingIndicator key="loading" />}
              {error && <ErrorMessage message={error} key="error" />}
              {themeData && (
                <ThemeResultDisplay themeData={themeData} key="result" />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Detect any Shopify store's theme with ease</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
