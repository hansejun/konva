import { KonvaEventObject } from 'konva/lib/Node';
import { Stage as StageType } from 'konva/lib/Stage';

import React, { useState } from 'react';
import { Layer, Rect, Stage, Line, Group } from 'react-konva';

const getMousePos = (stage: StageType): number[] => {
  return [
    stage.getPointerPosition()?.x || 0,
    stage.getPointerPosition()?.y || 0,
  ];
};

const DrawPage = () => {
  const [points, setPoints] = useState<number[][]>([]);
  const [curMousePos, setMousePos] = useState<number[]>([0, 0]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const mousePos = getMousePos(stage);

    if (isFinished) return;

    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true);
    } else {
      setPoints(prev => [...prev, mousePos]);
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

  const handleMouseOutStartPoint = (e: KonvaEventObject<MouseEvent>) => {
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
    setPoints(prev => [...prev.slice(0, index), pos, ...prev.slice(index + 1)]);
  };

  const handleDragOutPoint = (e: KonvaEventObject<MouseEvent>) => {
    console.log('end', e);
  };
  const flattenedPoints = points
    .concat(isFinished ? [] : curMousePos)
    .reduce((a, b) => a.concat(b), []);

  const stageProps = (editMode: boolean) =>
    editMode && { onMouseDown: handleClick, onMouseMove: handleMouseMove };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className="w-32 border-2 border-black p-2"
        onClick={() => setEditMode(prev => !prev)}
      >
        Edit Mode
      </button>
      <Stage
        width={600}
        height={600}
        className="border-4 border-stone-700"
        {...stageProps(editMode)}
      >
        <Layer>
          <Group draggable={editMode}>
            <Line
              points={flattenedPoints}
              stroke="#3495ff"
              fill="#a6d1ff80"
              strokeWidth={1.5}
              closed={isFinished}
            />
            {points.map((point, index) => {
              const width = 6;
              const x = point[0] - width / 2;
              const y = point[1] - width / 2;
              const startPointAttr =
                index === 0
                  ? {
                      hitStrokeWidth: 12,
                      onMouseOver: handleMouseOverStartPoint,
                      onMouseOut: handleMouseOutStartPoint,
                    }
                  : null;
              return editMode ? (
                <Rect
                  key={index}
                  x={x}
                  y={y}
                  width={width}
                  height={width}
                  fill="white"
                  stroke="#3495ff"
                  strokeWidth={3}
                  onDragStart={handleDragStartPoint}
                  onDragMove={handleDragMovePoint}
                  onDragEnd={handleDragOutPoint}
                  draggable
                  {...startPointAttr}
                />
              ) : null;
            })}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawPage;
