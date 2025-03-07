import React, { useState } from "react";

interface ThemeDetectorFormProps {
  onSubmit: (url: string) => void;
}

function ThemeDetectorForm({ onSubmit }: ThemeDetectorFormProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-8"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a Shopify store URL (e.g., https://store.shopify.com)"
        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        required
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
      >
        Detect Theme
      </button>
    </form>
  );
}

export default ThemeDetectorForm;
