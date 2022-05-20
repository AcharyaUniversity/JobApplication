import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useContext } from "react";

const mobileMaxWidth: number = 800;

const MobileViewContext = createContext<boolean | undefined>(undefined);

export const useMobileView = () => useContext(MobileViewContext);

function ViewContext({ children }: PropsWithChildren<{}>) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (window.innerWidth < mobileMaxWidth) setIsMobile(true);
    else setIsMobile(false);
  }, []);

  return (
    <MobileViewContext.Provider value={isMobile}>
      {children}
    </MobileViewContext.Provider>
  );
}

export default ViewContext;
