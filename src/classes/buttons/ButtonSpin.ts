import { Scene } from 'phaser';
import { TextureKeys } from '../../common/enums/TextureKeys';
import ButtonBase from './ButtonBase';

export default class ButtonSpin extends ButtonBase {
  public isDown: boolean;
  private _handleClick: () => void;
  private _disabled: boolean;

  constructor(scene: Scene, x: number, y: number, handleClick: () => void) {
    const configButtonBase = {
      scene,
      x,
      y,
      texture: TextureKeys.BUTTON_SPIN_PRESED,
    };
    super(configButtonBase);
    this.isDown = false;
    this._handleClick = handleClick;

    this.on('pointerdown', this.pointerDownHandler.bind(this));
    this.on('pointerup', this.pointerUpHandler.bind(this));
  }

  public disable() {
    this._disabled = true;
  }

  public undisable() {
    this._disabled = false;
  }

  public get disabled() {
    return this._disabled;
  }

  private pointerDownHandler() {
    if (this._disabled) {
      return;
    }

    this.setTexture(TextureKeys.BUTTON_SPIN);
    this.isDown = true;
    this._handleClick();
  }

  private pointerUpHandler() {
    this.setTexture(TextureKeys.BUTTON_SPIN_PRESED);
    this.isDown = false;
  }
}
