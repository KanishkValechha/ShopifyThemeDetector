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

function ThemeResultDisplay({ themeData }: ThemeResultDisplayProps) {
  return (
    <div className="theme-result">
      <h2>Theme Details</h2>
      <div className="result-item">
        <strong>Theme Name:</strong>{" "}
        <span className="theme-name">{themeData.themeName}</span>
      </div>
      <div className="result-item">
        <strong>Theme ID:</strong> {themeData.themeId}
      </div>
      <div className="result-item">
        <strong>Theme Store ID:</strong>{" "}
        {themeData.themeStoreId ? (
          <a
            href={`https://themes.shopify.com/themes/${themeData.themeStoreId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {themeData.themeStoreId}
          </a>
        ) : (
          "Custom theme (no store ID)"
        )}
      </div>
      <div className="result-item">
        <strong>Schema Version:</strong> {themeData.schemaVersion}
      </div>
      {themeData.shopDomain && (
        <div className="result-item">
          <strong>Shop Domain:</strong> {themeData.shopDomain}
        </div>
      )}
    </div>
  );
}

export default ThemeResultDisplay;
