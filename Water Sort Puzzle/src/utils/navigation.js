import { useNavigate, useNavigationType } from 'react-router-dom';

/**
 * Back action that never grows the history stack.
 * Screens reached by an in-app tap go back; a fresh deep link falls back home.
 */
export const useGoBack = (fallback = '/') => {
  const navigate = useNavigate();
  const enteredByPush = useNavigationType() === 'PUSH';
  return () => (enteredByPush ? navigate(-1) : navigate(fallback, { replace: true }));
};
