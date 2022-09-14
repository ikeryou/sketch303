import { MyObject3D } from "../webgl/myObject3D";
import { Util } from "../libs/util";
import { Conf } from '../core/conf';
import { Item } from "./item";
import { ItemScroll } from './itemScroll';
import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { Func } from '../core/func';


export class ItemWrapper extends MyObject3D {

  private _item:Array<Item> = [];
  private _scrollItem:ItemScroll;

  constructor() {
    super()

    const geo = new PlaneGeometry(1,1);
    const num = Util.instance.randomInt(3, Conf.instance.ITEM_NUM)
    for(let i = 0; i < num; i++) {
      const item = new Item({
        geo:geo,
        id:i,
        num:num,
      });
      this.add(item);
      this._item.push(item);
    }

    this._scrollItem = new ItemScroll()
    this.add(this._scrollItem);
  }


  protected _update():void {
    super._update();

    const sw = Func.instance.sw()
    const sh = Func.instance.sh()

    const itemSize = Math.min(sw, sh) * 0.5;
    const scrollItemSize = this._scrollItem.size.height;

    this._item.forEach((val,i) => {
      const test = this._scrollItem.position.y - Util.instance.map(i, 0, this._item.length - 1, scrollItemSize * 0.25, 0);
      const v = Math.abs(val.position.y - test) * 1;
      let radius = Util.instance.map(i, 0, this._item.length - 1, 0.8, 0.4) * 1;
      val.setRadius(Util.instance.map(v, scrollItemSize * 0.0, scrollItemSize * 0.75, radius, 0));

      // サイズと位置
      val.setSize(itemSize, itemSize);
      val.position.y = i * 0.1;
      val.rotation.x = Util.instance.radian(90);
    })
  }


  protected _resize(): void {
    super._resize();
  }
}