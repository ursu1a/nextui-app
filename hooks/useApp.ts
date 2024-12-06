import { useAppSelector } from "./reduxHooks";

export const useApp = () => {
  const { isLoading } = useAppSelector((state) => state.app);

  return { isLoading };
}
