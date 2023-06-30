import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  show:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  openDialog()
  {
    this.show=!(this.show);
  }
  editProduct()
  {
    this.openDialog();
  }

  deleteProduct()
  {
    confirm("Are You sure Want to Delete!");
  }
}
