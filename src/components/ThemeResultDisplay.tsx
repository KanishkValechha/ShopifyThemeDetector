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
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Theme Details
      </h2>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700 min-w-[140px]">
            Theme Name:
          </span>
          <span className="text-indigo-600 font-semibold">
            {themeData.themeName}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700 min-w-[140px]">
            Theme ID:
          </span>
          <span className="text-gray-800">{themeData.themeId}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700 min-w-[140px]">
            Theme Store ID:
          </span>
          {themeData.themeStoreId ? (
            <a
              href={`https://themes.shopify.com/themes/${themeData.themeStoreId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline transition-colors"
            >
              {themeData.themeStoreId}
            </a>
          ) : (
            <span className="text-gray-600">Custom theme (no store ID)</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <span className="font-medium text-gray-700 min-w-[140px]">
            Schema Version:
          </span>
          <span className="text-gray-800">{themeData.schemaVersion}</span>
        </div>

        {themeData.shopDomain && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium text-gray-700 min-w-[140px]">
              Shop Domain:
            </span>
            <span className="text-gray-800">{themeData.shopDomain}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThemeResultDisplay;
