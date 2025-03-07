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
    <div className="app-container">
      <div className="detector-card">
        <h1 className="app-title">Shopify Theme Detector</h1>

        <ThemeDetectorForm onSubmit={handleDetectTheme} />

        {loading && <LoadingIndicator />}
        {error && <ErrorMessage message={error} />}
        {themeData && <ThemeResultDisplay themeData={themeData} />}
      </div>
    </div>
  );
}

export default App;
