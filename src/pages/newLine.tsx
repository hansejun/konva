import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { KonvaEventObject } from 'konva/lib/Node';
import { Stage } from 'konva/lib/Stage';
import { Vector2d } from 'konva/lib/types';
import React, { useEffect, useRef, useState } from 'react';

type KonvaClass = {
  stage: Stage | null;
  layer: Layer | null;
};

const NewLine = () => {
  const [points, setPoints] = useState<number[][]>([]);
  const [curMousePos, setCurMousePos] = useState([0, 0]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [konvaClass, setKonvaClass] = useState<KonvaClass>({
    stage: null,
    layer: null,
  });
  const konvaRef = useRef<HTMLDivElement>(null);

  const initKonva = () => {
    if (!konvaRef.current) return;
    const stage = new Konva.Stage({
      container: konvaRef.current,
      width: 500,
      height: 500,
    });

    const layer = new Konva.Layer();

    stage.add(layer);

    setKonvaClass({ stage, layer });
  };

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    console.log('click');
    const { stage } = konvaClass;
    if (!stage) return;

    const mousePos = stage.getPointerPosition();

    if (isFinished || !mousePos) return;

    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true);
    } else {
      setPoints(prev => [...prev, [mousePos.x, mousePos.y]]);
      drawPolyline();
    }
  };

  const flattenPoints = () => {
    return points.concat(isFinished ? [] : curMousePos).flat();
  };

  const drawPolyline = () => {
    console.log('draw');
    const { layer } = konvaClass;

    if (!layer) return;

    layer.destroyChildren();
    const line = new Konva.Line({
      points: flattenPoints(),
      stroke: '#3495ff',
      fill: '#a6d1ff80',
      strokeWidth: 1.5,
      closed: isFinished,
    });
    layer.add(line);

    points.forEach((point, index) => {
      const width = 6;
      const x = point[0] - width / 2;
      const y = point[1] - width / 2;

      const rect = new Konva.Rect({
        x: x,
        y: y,
        width: width,
        height: width,
        fill: 'white',
        stroke: '#3495ff',
        strokeWidth: 3,
        draggable: true,
        hitStrokeWidth: index === 0 ? 12 : 0,
      });
      rect.on('mouseout', handleMouseOutStartPoint);
      rect.on('mouseover', handleMouseOverStartPoint);
      // rect.on('', handleMouseOverStartPoint)
      // rect.on('mouseout',handleMouseOverStartPoint)
      //    onMouseOver: ,
      //   onMouseOut: ,
      //   onDragStart: handleDragStartPoint,
      //   onDragMove: handleDragMovePoint,
      //   onDragEnd: handleDragOutPoint,
      layer.add(rect);
    });

    layer.draw();
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    console.log('move!');
    const { stage } = konvaClass;
    if (!stage) return;
    const mousePos = stage.getPointerPosition();

    if (!mousePos) return;
    setCurMousePos([mousePos.x, mousePos.y]);
  };

  const handleMouseOverStartPoint = () => {
    console.log('1');
    if (isFinished || points.length < 3) return;
    document.body.style.cursor = 'pointer';
    setIsMouseOverStartPoint(true);
  };

  const handleMouseOutStartPoint = () => {
    console.log('1');
    document.body.style.cursor = 'default';
    setIsMouseOverStartPoint(false);
  };
  const handleDragStartPoint = (e: KonvaEventObject<MouseEvent>) => {
    console.log('start', e);
  };

  const handleDragMovePoint = (e: KonvaEventObject<MouseEvent>) => {
    const point = e.target;
    const index = point.index - 1;
    const pos = [point.x(), point.y()];
    points.splice(index, 1, pos);
    drawPolyline();
  };

  const handleDragOutPoint = (e: KonvaEventObject<MouseEvent>) => {
    console.log('end', e);
  };

  const handleEditModeButtonClick = (
    stage: Stage | null,
    editMode: boolean,
  ) => {
    if (!stage) return;
    if (!editMode) {
      stage.on('mousedown', handleClick);
      stage.on('mousemove', handleMouseMove);
    } else {
      stage.off('mousedown');
      stage.off('mousemove');
    }
    setEditMode(prev => !prev);
  };

  useEffect(() => {
    initKonva();
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <button
        className={`w-30 border p-4 ${
          editMode ? 'bg-transparent' : 'bg-green-300'
        }`}
        onClick={() => handleEditModeButtonClick(konvaClass.stage, editMode)}
      >
        editMode
      </button>
      <div
        ref={konvaRef}
        className="h-[500px] w-[500px] border bg-red-200"
      ></div>
      ;
    </div>
  );
};

export default NewLine;
