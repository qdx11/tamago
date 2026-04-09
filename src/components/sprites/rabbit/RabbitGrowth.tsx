import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { PixelAnimalSprite } from '../shared/PixelSprite';
import { PIX } from '../shared/pixelData';

export function RabbitGrowth({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.rabbit[path];
  return <PixelAnimalSprite data={PIX.rabbit.growth} mood={mood}
    body={p.body} accent={p.accent} outline={p.outline} sickFilter={p.sickFilter} size={size} />;
}
