import Konva from "konva";

// Aoi의 크기를 변환
export const createAoiTransformer = (size: {
  width: number;
  height: number;
}) => {
  return new Konva.Transformer({
    rotateEnabled: false,
    draggable: false,
    keepRatio: false,

    // Aoi Rect Node의 크기 limit을 조절
    boundBoxFunc: (oldBox, newBox) => {
      if (
        Math.abs(newBox.width) > size.width ||
        Math.abs(newBox.height) > size.height
      ) {
        return oldBox;
      }
      return newBox;
    },
  });
};
