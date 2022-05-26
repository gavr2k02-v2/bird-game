import { SpritesKeys } from '../../common/enums/SpritesKeys';

export class Item extends Phaser.Physics.Arcade.Sprite {
  private _lastPos?: number;

  constructor(scene: Phaser.Scene, x: number, y: number, key: SpritesKeys, size: number, lastPos?: number) {
    super(scene, x, y, key);
    this.init(size, lastPos);
  }

  private init(szie: number, lastPos?: number) {
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setCollideWorldBounds(false);
    this.setDepth(1);
    this.setDisplaySize(szie, szie);
    (this.body as any).onWorldBounds = true;
    this._lastPos = lastPos;
  }

  public scroll() {
    this.body.velocity.y += this.scene.scale.height;
  }

  public preUpdate(): void {
    if (this._lastPos && this._lastPos <= this.y) {
      this.setVelocity(0, 0);
      this._lastPos = undefined;
    }

    if (this.y >= this.scene.scale.height - 365) {
      this.destroy();
    }
  }
}
