import Phaser from 'phaser';
import { STYLE_TEXT } from '../common/constants';
import { BackgroundKeys } from '../common/enums/BackgroundKeys';
import { SceneKeys } from '../common/enums/SceneKeys';
import { SpritesKeys } from '../common/enums/SpritesKeys';
import { TextureKeys } from '../common/enums/TextureKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PRELOADER);
  }

  public preload() {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, 'LOADING CONTENT', {
        ...STYLE_TEXT,
        fontFamily: `roboto, sans-serif`,
      })
      .setOrigin(0.5);

    this.uploadImages();
  }

  public create(): void {
    this.scene.start(SceneKeys.GAME);
  }

  private uploadImages() {
    this.load.image(BackgroundKeys.BACKGROND, 'images/background/game.png');
    this.load.image(BackgroundKeys.BACKGROND_WIN, 'images/background/game_win.png');
    this.load.image(BackgroundKeys.BACKGROND_LOSE, 'images/background/game_lose.png');

    this.load.image(TextureKeys.BUTTON_SPIN, 'images/textures/button_spin_pressed.png');
    this.load.image(TextureKeys.BUTTON_SPIN_PRESED, 'images/textures/button_spin.png');
    this.load.image(TextureKeys.BUTTON_AUTO_SPIN_ENABLE, 'images/textures/auto_spin_enable.png');
    this.load.image(TextureKeys.BUTTON_AUTO_SPIN_DISABLE, 'images/textures/auto_spin_disable.png');
    this.load.image(TextureKeys.BUTTON_FAST_MODE_ENABLE, 'images/textures/fast_mode_enable.png');
    this.load.image(TextureKeys.BUTTON_FAST_MODE_DISABLE, 'images/textures/fast_mode_disable.png');

    this.load.image(TextureKeys.BET_IMAGE, 'images/textures/bet_image.png');
    this.load.image(TextureKeys.BET_PLUS, 'images/textures/bet_plus.png');
    this.load.image(TextureKeys.BET_MINUS, 'images/textures/bet_minus.png');

    this.load.image(SpritesKeys.FIRST, 'images/sprites/cherry.png');
    this.load.image(SpritesKeys.SECOND, 'images/sprites/apple.png');
    this.load.image(SpritesKeys.THIRD, 'images/sprites/watermelon.png');
    this.load.image(SpritesKeys.FOURTH, 'images/sprites/grape.png');
  }
}
