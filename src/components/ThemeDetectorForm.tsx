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
    <form onSubmit={handleSubmit} className="detector-form">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a Shopify store URL (e.g., https://store.shopify.com)"
        className="url-input"
        required
      />
      <button type="submit" className="detect-button">
        Detect Theme
      </button>
    </form>
  );
}

export default ThemeDetectorForm;
