import { Scene } from 'phaser';
import { TextureKeys } from '../../common/enums/TextureKeys';
import ButtonBase from './ButtonBase';

export default class ButtonAutoSpin extends ButtonBase {
  private _autoSpinning: boolean;
  private _handleClick: () => void;

  constructor(scene: Scene, x: number, y: number, handleClick: () => void) {
    const configButtonBase = {
      scene,
      x,
      y,
      texture: TextureKeys.BUTTON_AUTO_SPIN_DISABLE,
    };
    super(configButtonBase);
    this._autoSpinning = false;
    this._handleClick = handleClick;

    this.on('pointerdown', this.pointerDownHandler.bind(this));
  }

  private pointerDownHandler() {
    this._autoSpinning = !this._autoSpinning;
    this.setTexture(this._autoSpinning ? TextureKeys.BUTTON_AUTO_SPIN_ENABLE : TextureKeys.BUTTON_AUTO_SPIN_DISABLE);

    this._handleClick();
  }

  public get autoSpinning(): boolean {
    return this._autoSpinning;
  }
}
