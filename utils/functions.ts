import { debounce } from "lodash";
import { Dispatch } from "@reduxjs/toolkit";

// Dispatch events with delay
export const debounceDispatch = (dispatch: Dispatch, delay: number = 500) => {
  const debounced = debounce(dispatch, delay, {leading: true, trailing: true});

  return (action: any) => {
    debounced(action);
  };
};
