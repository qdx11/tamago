import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { PixelAnimalSprite } from '../shared/PixelSprite';
import { PIX } from '../shared/pixelData';

export function PandaChild({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.panda[path];
  return <PixelAnimalSprite data={PIX.panda.childhood} mood={mood}
    body={p.body} accent={p.accent} outline={p.outline} sickFilter={p.sickFilter} size={size} />;
}
