import { Rect as RectType } from 'konva/lib/shapes/Rect';
import { Transformer as TransFormType } from 'konva/lib/shapes/Transformer';
import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';

interface PropsType {
  shapeProps: any;
  isSelected: any;
  onSelect: any;
  onChange: any;
}

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: PropsType) => {
  const shapeRef = useRef<RectType>(null);
  const trRef = useRef<TransFormType>(null);
  console.log(shapeRef);
  const handleOnDragEnd = (e: any) => {
    onChange({ ...shapeProps, x: e.target.x(), y: e.target.y() });
  };

  const handleTransformEnd = (e: any) => {
    if (!shapeRef.current) return;
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
    });
  };

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleOnDragEnd}
        onTransformEnd={handleTransformEnd}
        ref={shapeRef}
        {...shapeProps}
        draggable
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Rectangle;
