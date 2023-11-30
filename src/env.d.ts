interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number;
  readonly VITE_URL: string;
  readonly VITE_ENDPOINT_PRODUCTS: string;
  readonly VITE_ENDPOINT_CATEGORIES: string;
  readonly VITE_ENDPOINT_PRODUCT_TAGS: string;
  readonly VITE_ENDPOINT_REVIEWS: string;
  readonly VITE_ENDPOINT_NEWS: string;
  readonly VITE_ENDPOINT_NEWS_CATEGORIES: string;
  readonly VITE_ENDPOINT_BRANDS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
