import React, { useCallback, useReducer } from "react";

import { KeepAliveContext } from "./keepAliveContext";
import keepAliveReducer from "./keepAliveReducer";

import * as actionTypes from "./actionTypes";

export default function KeepAlive(props) {
  const [keepAliveState, dispatch] = useReducer(keepAliveReducer, {});

  const setKeepAliveState = useCallback(
    ({ reactElement, keepAliveId }) => {
      if (!keepAliveState[keepAliveId]) {
        dispatch({
          type: actionTypes.CREATING,
          payload: {
            keepAliveId,
            reactElement,
          },
        });
      }
    },
    [keepAliveState]
  );

  return (
    <KeepAliveContext.Provider
      value={{ keepAliveState, setKeepAliveState, dispatch }}
    >
      {props.children}
      {Object.values(keepAliveState).map(({ keepAliveId, reactElement }) => (
        <div
          key={keepAliveId}
          ref={(node) => {
            if (node && !keepAliveState[keepAliveId].nodes) {
              dispatch({
                type: actionTypes.CREATED,
                payload: {
                  keepAliveId,
                  nodes: [...node.childNodes],
                },
              });
            }
          }}
        >
          {reactElement}
        </div>
      ))}
    </KeepAliveContext.Provider>
  );
}
