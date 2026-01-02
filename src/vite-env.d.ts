
interface ImportMetaEnv {
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
    readonly VITE_BACKEND_URL: string;
    // agrega aquí todas tus otras variables
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }