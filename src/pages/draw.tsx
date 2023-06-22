import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';

import { useEffect, useRef, useState } from 'react';

interface KonvaClass {
  stage: Stage | null;
  layer: Layer | null;
}

interface InitKonva {
  ref: React.RefObject<HTMLDivElement>;
  size: {
    width: number;
    height: number;
  };
}

const getMousePos = (stage: Stage): number[] => {
  return [
    stage.getPointerPosition()?.x || 0,
    stage.getPointerPosition()?.y || 0,
  ];
};

const initialKonva = {
  stage: null,
  layer: null,
};

const Draw = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<number[]>([]);
  const [curMousePos, setMousePos] = useState<number[]>([0, 0]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [konvaClass, setKonvaClass] = useState<KonvaClass>(initialKonva);

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const mousePos = getMousePos(stage);

    if (isFinished) return;

    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true);
    } else {
      setPoints(prev => [...prev, ...mousePos]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const mousePos = getMousePos(stage);
    setMousePos(mousePos);
  };

  const handleMouseOverStartPoint = (e: KonvaEventObject<MouseEvent>) => {
    if (isFinished || points.length < 3) return;
    e.target.scale({ x: 2, y: 2 });
    setIsMouseOverStartPoint(true);
  };

  const handleMouseoutStartPoint = (e: KonvaEventObject<MouseEvent>) => {
    e.target.scale({ x: 1, y: 1 });
    setIsMouseOverStartPoint(false);
  };

  const handleDragStartPoint = (e: KonvaEventObject<MouseEvent>) => {
    console.log('start', e);
  };

  const handleDragMovePoint = (e: KonvaEventObject<MouseEvent>) => {
    const { target } = e;
    const index = target.index - 1;
    const pos = [target.attrs.x, target.attrs.y];
    setPoints(prev => [
      ...prev.slice(0, index),
      ...pos,
      ...prev.slice(index + 1),
    ]);
  };

  const handleDragOutPoint = (e: KonvaEventObject<MouseEvent>) => {
    console.log('end', e);
  };

  const AoiInitKonva = () => {
    const [stage, layer] = initKonva({
      ref: canvasRef,
      size: { width: 800, height: 800 },
    });

    // TODO: AOIGroupContainer 제거 layer에 바로 add로 수정
    const AOIGroupContainer = new Konva.Group();

    layer.add(AOIGroupContainer);
    stage.add(layer);

    stage.on('mousedown', handleClick);
    stage.on('mousemove', handleMouseMove);
    setKonvaClass({ stage, layer });
  };

  useEffect(() => {
    AoiInitKonva();
  }, []);
  console.log(curMousePos);
  return (
    <div
      className="h-[800px] w-[800px] rounded-md border-2 border-black bg-gray-200"
      id="aoi"
      ref={canvasRef}
    ></div>
  );
};

export default Draw;

const initKonva = ({ ref, size }: InitKonva): [Konva.Stage, Konva.Layer] => {
  const container = ref.current;
  const { width, height } = size;

  const stage = new Konva.Stage({
    container: container as HTMLDivElement,
    width,
    height,
  });

  const layer = new Konva.Layer();

  return [stage, layer];
};
