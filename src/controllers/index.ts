const ABORT_REQUEST_CONTROLLERS = new Map();

// export const abortRequestSafe = (key: string, reason = 'CANCELLED') => {
//   ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason);
// };
// export const abortAndGetSignalSafe = (key: string) => {
//   abortRequestSafe(key);

//   const newController = new AbortController();
//   ABORT_REQUEST_CONTROLLERS.set(key, newController);

//   return newController.signal;
// };

export const abortRequestSafe = (keys: string[], reason = 'CANCELLED') => {
  keys.forEach(key => ABORT_REQUEST_CONTROLLERS.get(key)?.abort?.(reason));
};
export const abortAndGetSignalSafe = (key: string) => {
  abortRequestSafe([key]);

  const newController = new AbortController();
  ABORT_REQUEST_CONTROLLERS.set(key, newController);

  return newController.signal;
};
