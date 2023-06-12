import Konva from "konva";
import React, { useCallback, useEffect, useState } from "react";

type ReturnType = [Konva.Stage | null, Konva.Layer | null];

const useInitKonva = (
  ref: React.RefObject<HTMLDivElement>,
  size: {
    width: number;
    height: number;
  }
): ReturnType => {
  const [stage, setStage] = useState<Konva.Stage | null>(null);
  const [layer, setLayer] = useState<Konva.Layer | null>(null);
  const AOIGroupContainer = new Konva.Group();

  const init = useCallback(() => {
    const { width, height } = size;
    // 왜 HTMLDivElement as를 붙여야 통과되는가...
    setStage(
      new Konva.Stage({
        container: ref.current as HTMLDivElement,
        width,
        height,
      })
    );
    setLayer(new Konva.Layer());
  }, [ref, size]);

  useEffect(() => {
    if (ref.current) {
      init();
    }
  }, [ref, init]);

  return [stage, layer];
};

export default useInitKonva;
