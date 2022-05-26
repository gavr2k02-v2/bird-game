import { Scene } from 'phaser';
import { TextureKeys } from '../../common/enums/TextureKeys';
import ButtonBase from './ButtonBase';

export enum BetButtonType {
  PLUS = 'plus',
  MINUS = 'minus',
  IMAGE = 'image',
}

export class ButtonBet extends ButtonBase {
  private _hanldeClick: () => void;

  constructor(scene: Scene, x: number, y: number, type: BetButtonType, size: number, handleClick?: () => void) {
    const configButtonBase = {
      scene,
      x,
      y,
      texture: getTextureByType(type),
      size,
    };
    super(configButtonBase);

    if (type === BetButtonType.IMAGE) {
      return;
    }

    this._hanldeClick = handleClick as () => void;

    this.on('pointerdown', this.pointerDownHandler.bind(this));
    this.on('pointerup', this.pointerUpHandler.bind(this));
  }

  private pointerUpHandler() {}

  private pointerDownHandler() {
    this._hanldeClick();
  }
}

function getTextureByType(type: BetButtonType): TextureKeys {
  const textures = {
    [BetButtonType.PLUS]: TextureKeys.BET_PLUS,
    [BetButtonType.MINUS]: TextureKeys.BET_MINUS,
    [BetButtonType.IMAGE]: TextureKeys.BET_IMAGE,
  };

  return textures[type];
}
