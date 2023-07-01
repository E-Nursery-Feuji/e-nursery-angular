import { Image } from "./image";
import { Type } from "./type";

export class Product
{
  public id!:number;
  public name!:string;
  public description!:string;
  public price!:number;
  public discount!:number;
  public quantity!:number;
  public type!:Type;
  public image!:Image
}
