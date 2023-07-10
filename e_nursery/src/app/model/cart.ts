import { Customer } from "./customer";
import { Product } from "./product";

export class Cart{
  public id!:number;
  public quantity!:number;
  public customer_id!:number;
  public product_id!:number;
}
