// This hook returns user information and authentication state
import { useAppSelector } from "./reduxHooks";

export const useAuth = () => {
  const { token, user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  return { token, user, isAuthenticated };
};
