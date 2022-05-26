import { Scene } from 'phaser';
import { TextureKeys } from '../../common/enums/TextureKeys';
import ButtonBase from './ButtonBase';

export default class ButtonFastMode extends ButtonBase {
  private _fastMode: boolean;

  constructor(scene: Scene, x: number, y: number) {
    const configButtonBase = {
      scene,
      x,
      y,
      texture: TextureKeys.BUTTON_FAST_MODE_DISABLE,
    };
    super(configButtonBase);
    this._fastMode = false;

    this.on('pointerdown', this.pointerDownHandler.bind(this));
  }

  private pointerDownHandler() {
    this._fastMode = !this._fastMode;
    this.setTexture(this.fastMode ? TextureKeys.BUTTON_FAST_MODE_ENABLE : TextureKeys.BUTTON_FAST_MODE_DISABLE);
  }

  public get fastMode(): boolean {
    return this._fastMode;
  }
}
