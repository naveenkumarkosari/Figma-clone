import React, { useCallback, useState } from "react";
import LiveCursor from "./cursor/LiveCursor";
import { useMyPresence, useOthers } from "@/liveblocks.config";
import CursorChat from "./cursor/CursorChat";
import { CursorMode } from "@/types/type";

function Live() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

//   const [cursorState, setCursorState]=useState({
//     mode:CursorMode.Hidden
//   })

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault;
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);
  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault;

    updateMyPresence({ cursor: null, message: null });
  }, []);
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100vh] w-full flex justify-center items-center text-center border-2 "
    >
      <h1 className="text-xl text-white">Figma live clone</h1>
      {/* {cursor && (
        <CursorChat />
      )} */}
      <LiveCursor others={others} />
    </div>
  );
}

export default Live;
