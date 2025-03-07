const PROXY_URL = "http://localhost:3001/api/fetch"; // Update with your actual proxy URL

interface ShopifyTheme {
    name: string;
    id: number;
    theme_store_id: number | null;
    schema_version: string;
}


export interface ThemeDetectionResult {
    themeName: string;
    themeId: number;
    themeStoreId: number | null;
    schemaVersion: string;
    shopDomain: string | null;
}

export async function detectShopifyTheme(url: string): Promise<ThemeDetectionResult> {
    try {
        // Make request to our proxy server
        const response = await fetch(`${PROXY_URL}?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
            const errorData: { message?: string } = await response.json();
            throw new Error(errorData.message || "Failed to fetch website content");
        }

        const html: string = await response.text();

        // Extract Shopify theme info using regex
        const shopMatch: RegExpMatchArray | null = html.match(/Shopify\.shop\s*=\s*"([^"]+)"/);
        const themeMatch: RegExpMatchArray | null = html.match(/Shopify\.theme\s*=\s*(\{[^;]+\})/);

        if (!themeMatch || !themeMatch[1]) {
            throw new Error(
                "Could not detect Shopify theme information. This might not be a Shopify store."
            );
        }

        try {
            // Parse the theme JSON object
            // We need to convert the JS object notation to valid JSON by adding quotes around property names
            const themeJsonString: string = themeMatch[1].replace(
                /([a-zA-Z0-9_]+):/g,
                '"$1":'
            );
            const theme: ShopifyTheme = JSON.parse(themeJsonString);

            return {
                themeName: theme.name,
                themeId: theme.id,
                themeStoreId: theme.theme_store_id,
                schemaVersion: theme.schema_version,
                shopDomain: shopMatch ? shopMatch[1] : null,
            };
        } catch (parseError: unknown) {
            const error = parseError as Error;
            throw new Error(
                "Failed to parse theme information: " + error.message
            );
        }
    } catch (error: unknown) {
        const err = error as Error;
        throw new Error(err.message || "Error fetching website");
    }
}
