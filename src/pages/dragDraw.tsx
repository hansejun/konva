import Konva from "konva";
import { Rect } from "konva/lib/shapes/Rect";
import React, { useEffect, useRef, useState } from "react";

const DragDraw = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleDraw = () => {
    const stage = new Konva.Stage({
      container: containerRef.current as HTMLDivElement,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const layer = new Konva.Layer();

    stage.add(layer);

    let isDrawing = false;
    let [startX, startY] = [0, 0];
    let currentRect: Rect;

    // 마우스 혹은 터치하였을 때 그림을 그리기 시작한다.
    stage.on("mousedown touchstart", (e) => {
      const pos = stage.getPointerPosition();
      startX = pos?.x || 0;
      startY = pos?.y || 0;

      // 시작점 기준으로 그림을 그린다.
      currentRect = new Konva.Rect({
        x: startX,
        y: startY,
        width: 0,
        height: 0,
        fill: "red",
        draggable: true,
      });
      layer.add(currentRect);
      isDrawing = true;
    });

    // 마우스가 움직이며 지속적으로 currentRect에 width와 height값을 계산해준다.
    stage.on("mousemove touchmove", () => {
      if (!isDrawing) return;
      const pos = stage.getPointerPosition();
      if (pos) {
        const width = pos.x - startX;
        const height = pos.y - startY;
        currentRect.width(width);
        currentRect.height(height);
        layer.batchDraw();
      }
    });

    // 마우스를 땐 순간 currentRect에 그림에 대한 정보가 전달된다.
    // layer의 children 안에 그려진 도형들에 대한 정보가 담겨있다.
    // 예: 저장 버튼 클릭 시에 layer.children.map(rect => console.log(rect.attrs)); // {x: 342, y: 182.5, width: 189, height: 137, fill: 'red'}
    // 위 정보를 저장하면 될 듯?
    stage.on("mouseup touchend", () => {
      isDrawing = false;
      console.log("currentRect", currentRect);
      console.log("layer", layer);
    });
  };
  useEffect(() => {
    handleDraw();
  }, []);

  return (
    <div
      className="h-[800px] w-[800px] rounded-md border-2 border-black bg-gray-200"
      id="aoi"
      ref={containerRef}
    ></div>
  );
};

export default DragDraw;
