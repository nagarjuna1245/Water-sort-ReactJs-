import React, { useEffect, useMemo, useRef } from 'react';
import { drawTube } from './tubeDraw.js';
import { getGlass } from '../../game/glassGeometry.js';

/**
 * One gameplay container: a static slot (the measurement anchor the pour
 * animator reads and never moves) holding a flyer that the animator
 * transforms, and a canvas that paints the glass plus its geometrically
 * solved liquid from the real bottle array.
 */
export const GameTube = React.memo(function GameTube({
  index,
  kind,
  skin,
  styleType,
  layers,
  cssW,
  cssH,
  selected,
  shaking,
  registry,
}) {
  const slotRef = useRef(null);
  const flyerRef = useRef(null);
  const canvasRef = useRef(null);

  const glass = useMemo(
    () => getGlass(kind, kind === 'tube' ? styleType : skin),
    [kind, styleType, skin]
  );

  useEffect(() => {
    const map = registry.current;
    const record = {
      index,
      slot: slotRef.current,
      flyer: flyerRef.current,
      canvas: canvasRef.current,
      glass,
      cssW,
      cssH,
    };
    map.set(index, record);
    return () => {
      if (map.get(index) === record) map.delete(index);
    };
  }, [index, glass, cssW, cssH, registry]);

  // Settled state: the liquid always comes straight out of `layers`.
  useEffect(() => {
    drawTube(canvasRef.current, { glass, cssW, cssH, layers, level: layers.length });
  }, [glass, cssW, cssH, layers]);

  return (
    <div
      ref={slotRef}
      className={`tube-slot ${shaking ? 'container-shake' : ''} ${selected ? 'is-selected' : ''}`}
      style={{ width: cssW, height: cssH }}
    >
      <div ref={flyerRef} className="tube-flyer">
        <canvas ref={canvasRef} className="tube-canvas" aria-hidden="true" />
      </div>
    </div>
  );
});

export default GameTube;
