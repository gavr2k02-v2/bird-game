import { STYLE_TEXT } from '../../common/constants';
import { api } from '../../services';

export class ScoreManager {
  private _balance: number;
  private _bet = 1;

  private _balanceTitle: Phaser.GameObjects.Text;
  private _betTitle: Phaser.GameObjects.Text;

  constructor(private _scene: Phaser.Scene) {
    this.init();
  }

  private init() {
    this.create();
    this.print();
  }

  private create(): void {
    const style = {
      ...STYLE_TEXT,
      fontSize: '2rem',
      backgroundColor: 'rgb(127, 145, 164)',
      borderRadius: '5px',
      color: 'white',
    };

    this._scene.add.text(20, 32, `Balance: `, style).setOrigin(0, 0).setDepth(2);
    this._balanceTitle = this._scene.add.text(180, 32, '', style).setOrigin(0, 0).setDepth(2);

    this._scene.add.text(20, 64, `Bet    : `, style).setOrigin(0, 0).setDepth(2);
    this._betTitle = this._scene.add.text(180, 64, '', style).setOrigin(0, 0).setDepth(2);
  }

  private print() {
    this._balanceTitle.setText(this._balance ? `${this.padding(this._balance)}` : '*********');
    this._betTitle.setText(`${this.padding(this._bet)}`);
  }

  private padding(num: number): string {
    return `${num}`.padStart(9, '0');
  }

  public setBalance(balance: number): void {
    this._balance = balance;
    this.print();
  }

  public setBet(bet: number): void {
    if (bet < 1) {
      return;
    }

    this._bet = bet;
    api.setBet(bet);
    this.print();
  }
}
