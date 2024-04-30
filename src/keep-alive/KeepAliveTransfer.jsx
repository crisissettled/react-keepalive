import React, { useContext, useEffect, useRef } from "react";
import { KeepAliveContext } from "./keepAliveContext";

export default function KeepAliveTransfer(KeepAliveComponent, keepAliveId) {
  return function (props) {
    const _ref = useRef(null);
    const { keepAliveState, setKeepAliveState } = useContext(KeepAliveContext);

    useEffect(() => {
      const state = keepAliveState[keepAliveId];
      if (state && state.nodes) {
        state.nodes.forEach((node) => _ref.current.appendChild(node));
      } else {
        setKeepAliveState({
          reactElement: <KeepAliveComponent {...props} />,
          keepAliveId,
        });
      }
    }, [keepAliveState, setKeepAliveState, props]);

    return <div ref={_ref}></div>;
  };
}
