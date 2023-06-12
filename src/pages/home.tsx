import React, { useEffect, useRef, useState } from "react";

import Konva from "konva";
import { createAoiTransformer } from "../utils/draw";

const size = { width: 1000, height: 1000 };

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [konvaClass, setKonvaClass] = useState<{
    stage: Konva.Stage | null;
    layer: Konva.Layer | null;
    transformer: Konva.Transformer | null;
  }>({ stage: null, layer: null, transformer: null });

  // 스테이지 -> 레이어 -> shape
  // shape를 레이어에 추가한다음 스테이지에 레이어를 추가하고 레이어를 그린다.
  const initKonva = () => {
    // 먼저 스테이지를 생성해야 한다.
    const stage = new Konva.Stage({
      container: containerRef.current as HTMLDivElement,
      width: 1000,
      height: 1000,
    });

    // 레이어 생성
    const layer = new Konva.Layer();

    // 모양 만들기
    const circle = new Konva.Circle({
      x: 100,
      y: 100,
      radius: 70,
      width: 30,
      height: 30,
      fill: "red",
      stroke: "black",
      draggable: true,
    });

    const AOIGroupContainer = new Konva.Group();

    const transformer = createAoiTransformer({ width: 1000, height: 1000 });

    const rectArea = new Konva.Rect({
      fill: "#a6d1ff80",
      stroke: "#3495ff",
      strokeWidth: 1,
      visible: false,
      name: "drag",
      dash: [5, 5],

      // AOI 자체 drag 기능
      draggable: false,
    });

    const newRect = new Konva.Rect({
      x: 0,
      y: 642,
      width: 176,
      height: 141,
      fill: "red",
      stroke: "#222222",
      strokeWidth: 1,

      id: "aoi",
      draggable: false,
    });

    layer.add(AOIGroupContainer);

    // 레이어에 모양 추가
    layer.add(circle);
    layer.add(newRect);
    layer.add(transformer);

    layer.add(rectArea);

    // 스테이지에 레이어 추가
    stage.add(layer);

    setKonvaClass({ stage, layer, transformer });

    // 이미지를 그립니다.
    layer.draw();
  };

  useEffect(() => {
    initKonva();
  }, []);

  useEffect(() => {}, []);

  return (
    <div
      className="h-[800px] w-[800px] rounded-md border-2 border-black bg-gray-200"
      id="aoi"
      ref={containerRef}
    ></div>
  );
};

export default Home;
