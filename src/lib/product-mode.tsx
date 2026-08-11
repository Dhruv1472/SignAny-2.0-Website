import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ProductMode = "signany" | "salesforce";

type Ctx = {
  mode: ProductMode;
  setMode: (m: ProductMode) => void;
  toggle: () => void;
  isSalesforce: boolean;
};

const STORAGE_KEY = "signany-product-mode";

const ProductModeContext = createContext<Ctx | null>(null);

export function ProductModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ProductMode>("signany");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "salesforce" || stored === "signany") setModeState(stored);
  }, []);

  const setMode = (m: ProductMode) => {
    setModeState(m);
    window.localStorage.setItem(STORAGE_KEY, m);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ProductModeContext.Provider
      value={{
        mode,
        setMode,
        toggle: () => setMode(mode === "signany" ? "salesforce" : "signany"),
        isSalesforce: mode === "salesforce",
      }}
    >
      {children}
    </ProductModeContext.Provider>
  );
}

export function useProductMode() {
  const ctx = useContext(ProductModeContext);
  if (!ctx) throw new Error("useProductMode must be used inside ProductModeProvider");
  return ctx;
}
