import { Circle, Layer, Stage } from 'react-konva';
import { useState } from 'react';
import { initialLines, initialRectangles } from '../data';
import Rectangle from '../components/Rectangle';

const INITIAL_SIZE = { width: 1000, height: 1000 };

const Home = () => {
  const [rects, setRects] = useState(initialRectangles);
  const [lines, setLines] = useState(initialLines);
  const [selectedId, setSelectedId] = useState<null | string>(null);

  const checkedSelect = (e: any) => {
    const clickedEmpty = e.target === e.target.getStage();
    if (clickedEmpty) {
      setSelectedId(null);
    }
  };

  console.log(rects);

  return (
    <div
      className="h-[800px] w-[800px] rounded-md border-2 border-black bg-red-200"
      id="aoi"
    >
      <Stage
        width={INITIAL_SIZE.width}
        height={INITIAL_SIZE.height}
        onMouseDown={checkedSelect}
      >
        <Layer>
          {rects?.map((rect, i) => (
            <Rectangle
              key={rect.id}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => setSelectedId(rect.id)}
              onChange={(newAttrs: any) => {
                const copyRects = rects.slice();
                copyRects[i] = newAttrs;
                setRects(copyRects);
              }}
            />
          ))}
          <Circle x={200} y={100} radius={50} fill="green" />
        </Layer>
      </Stage>
    </div>
  );
};

export default Home;
