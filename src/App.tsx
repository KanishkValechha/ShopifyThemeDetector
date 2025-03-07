import { useState } from "react";
import ThemeDetectorForm from "./components/ThemeDetectorForm";
import ThemeResultDisplay from "./components/ThemeResultDisplay";
import LoadingIndicator from "./components/LoadingIndicator";
import ErrorMessage from "./components/ErrorMessage";
import { detectShopifyTheme, ThemeDetectionResult } from "./themeDetector";
import "./App.css";

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Shopify Theme Detector
          </h1>

          <ThemeDetectorForm onSubmit={handleDetectTheme} />

          {loading && <LoadingIndicator />}
          {error && <ErrorMessage message={error} />}
          {themeData && <ThemeResultDisplay themeData={themeData} />}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Detect any Shopify store's theme with ease
        </div>
      </div>
    </div>
  );
}

export default App;
