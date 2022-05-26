import ButtonSpin from '../classes/buttons/ButtonSpin';
import ButtonAutoSpin from '../classes/buttons/ButtonAutoSpin';
import { Item } from '../classes/sprite/Item';
import { BackgroundKeys } from '../common/enums/BackgroundKeys';
import { MessageTypes } from '../common/enums/MessageTypes';
import { SceneKeys } from '../common/enums/SceneKeys';
import { SpritesKeys } from '../common/enums/SpritesKeys';
import { Message } from '../common/types/Message';
import { api } from '../services';
import { BaseScene } from './BaseScene';
import { delay } from '../common/utils';
import { ScoreManager } from '../classes/score/ScoreManager';
import ButtonFastMode from '../classes/buttons/ButtonFastMode';
import { BetButtonType, ButtonBet } from '../classes/buttons/BetButtons';

export class Game extends BaseScene {
  private _spinning: boolean;
  private _items: Item[] = [];
  private _slotData: Message;
  private _buttonSpin: ButtonSpin;
  private _buttonAutoSpin: ButtonAutoSpin;
  private _buttonFastMode: ButtonFastMode;
  private _manager: ScoreManager;

  constructor() {
    super(SceneKeys.GAME);
  }

  public create() {
    super.create();
    this.setBackgroundDefault();
    this.createGameObjects();
    this._manager = new ScoreManager(this);
    this._buttonSpin = new ButtonSpin(this, this.widthScene / 2 + this.widthScene / 5, this.heightScene / 1.1, () =>
      this.scroll(),
    );

    this._buttonAutoSpin = new ButtonAutoSpin(
      this,
      this.widthScene / 3 + this.widthScene / 5,
      this.heightScene / 1.11,
      () => this.handleAutoSpin(),
    );

    const buttonBetWidth = 180;
    const buttonBetHeight = 120;
    new ButtonBet(this, buttonBetWidth, buttonBetHeight, BetButtonType.IMAGE, this.widthScene / 16);
    new ButtonBet(
      this,
      buttonBetWidth + buttonBetWidth / 4,
      buttonBetHeight,
      BetButtonType.PLUS,
      this.widthScene / 24,
      () => this._manager.setBet(api.bet + 1),
    );
    new ButtonBet(
      this,
      buttonBetWidth - buttonBetWidth / 4,
      buttonBetHeight,
      BetButtonType.MINUS,
      this.widthScene / 24,
      () => this._manager.setBet(api.bet - 1),
    );

    this._buttonFastMode = new ButtonFastMode(this, 70, 120);
    api.setHandler(this.handleMessage.bind(this));
  }

  private setBackgroundDefault() {
    this.createBackground(this, 0, 0, this.widthScene, this.heightScene, BackgroundKeys.BACKGROND);
  }

  private setBackgroundWin() {
    this.createBackground(this, 0, 0, this.widthScene, this.heightScene, BackgroundKeys.BACKGROND_WIN);
  }

  private setBackgroundLose() {
    this.createBackground(this, 0, 0, this.widthScene, this.heightScene, BackgroundKeys.BACKGROND_LOSE);
  }

  private handleMessage(message: Message) {
    if (!message?.symbols) {
      return;
    }

    this._spinning = false;
    this._slotData = message;
  }

  private handleAutoSpin() {
    return this._buttonAutoSpin.autoSpinning && this.enebleAutoSpin();
  }

  private enebleAutoSpin() {
    if (!this._buttonAutoSpin.autoSpinning) {
      return;
    }

    this.scroll();
    setTimeout(() => this.enebleAutoSpin(), 500);
  }

  private async spawnSpritesByResponse(message: Message) {
    this._items = [];
    const data = message.symbols;
    const size = this.widthScene / 5.5;
    const startPosWidth = this.widthScene / 2 - this.widthScene / 3 - size;
    const startPosHeight = this.heightScene / 2 - this.heightScene / 3 - size;

    for (let i = 1; i < data.length + 1; i++) {
      for (let j = data[i - 1].length; j > 0; j--) {
        const item = new Item(
          this,
          startPosWidth + i * size,
          0,
          this.getSpriteByNumber(data[i - 1][j - 1]),
          size,
          startPosHeight + j * size,
        );

        this._items.push(item);
        item.scroll();
      }
      await delay(150);
    }

    message.type === MessageTypes.LOSE ? this.setBackgroundLose() : this.setBackgroundWin();

    await delay(280);

    this.showWinSymbols(message.winSymbols);
    this._manager.setBalance(this._slotData.balance);
    api.updateBalance(this._slotData.balance);
    this._buttonSpin.undisable();
  }

  private scroll() {
    if (this._buttonSpin.disabled) {
      return;
    }

    this._items.forEach((item) => item.scroll());
    this._buttonSpin.disable();
    this._spinning = true;
    this.setBackgroundDefault();

    void api.spin();

    this.spin();
  }

  private async spin() {
    const min = this._buttonFastMode.fastMode ? 1 : 3;
    let i = 0;

    while (i++ < min || this._spinning) {
      for (let k = 0; k < 3; k++) {
        await delay(150);
        this.createRandomSprites();
      }
      await delay(200);
    }

    this.spawnSpritesByResponse(this._slotData);
  }

  private createRandomSprites() {
    const size = this.widthScene / 5.5;
    const startPosWidth = this.widthScene / 2 - this.widthScene / 3 - size;

    for (let i = 1; i < 6; i++) {
      const item = new Item(
        this,
        startPosWidth + i * size,
        0,
        this.getSpriteByNumber(Math.floor(Math.random() * 4)),
        size,
      );
      this._items.push(item);
      item.scroll();
    }
  }

  private createGameObjects() {
    const size = this.widthScene / 5.5;
    const startPosWidth = this.widthScene / 2 - this.widthScene / 3 - size;
    const startPosHeight = this.heightScene / 2 - this.heightScene / 3 - size;

    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 4; j++) {
        this._items.push(
          new Item(
            this,
            startPosWidth + i * size,
            startPosHeight + j * size,
            this.getSpriteByNumber(Math.floor(Math.random() * 4)),
            size,
          ),
        );
      }
    }
  }

  private getSpriteByNumber(num: number): SpritesKeys {
    const sprites: Record<number, SpritesKeys> = {
      0: SpritesKeys.FIRST,
      1: SpritesKeys.SECOND,
      2: SpritesKeys.THIRD,
      3: SpritesKeys.FOURTH,
    };

    return sprites[num] || SpritesKeys.FIRST;
  }

  private showWinSymbols(winSymbols: number[][]) {
    if (!winSymbols?.length) {
      return;
    }

    const symbols = winSymbols.map((items) => items.reverse()).flat();
    this._items.forEach((item, idx) => symbols[idx] !== 1 && item.setTint(0x363636));
  }
}
