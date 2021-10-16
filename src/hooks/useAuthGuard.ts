import { useEffect } from "react";

export const useGuard = (cb: () => any) => {
  useEffect(() => {
    cb();
  }, [cb]);
};
