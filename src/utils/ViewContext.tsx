import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useContext } from "react";

// interface IMobileViewContext {
//   isMobile: boolean;
// }

const MobileViewContext = createContext<boolean | undefined>(undefined);

export const useMobileView = () => useContext(MobileViewContext);

function ViewContext({ children }: PropsWithChildren<{}>) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const handleWindowSizeChange = () => {
    if (window.innerWidth < 800) setIsMobile(true);
    else setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <MobileViewContext.Provider value={isMobile}>
      {children}
    </MobileViewContext.Provider>
  );
}

export default ViewContext;
