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
<<<<<<< Updated upstream
  editProduct()
=======

  //get the types
  getTypes() {
    this.productservice
      .getTypes()
      .subscribe((data) => (this.types = this.types.concat(data)));
  }

  // foe file change
  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  // save the image & product
  saveImageProduct() {
    this.submitted = true;
    // alert(1)
    if (this.saveProduct.invalid) {
      return;
    }


      if (this.editProductId)
      {

        if (this.saveProduct.valid) {

          this.product = this.saveProduct.value; //setting values of product
          this.types.forEach((type) => {         //setting type to product object
            if (type.name == this.saveProduct.value.typeName) {
              this.product.type = {
                id: type.id,
                name: type.name,
              };
            }
          });
          this.productservice.updateProductImage(this.file, this.product);
          this.editProductId = 0;
        }


      }
      else
      {
        // alert(2)
        if (this.saveProduct.valid) {
          // alert(3)
          this.product = this.saveProduct.value; //setting values of product
          this.types.forEach((type) => {         //setting type to product object
            if (type.name == this.saveProduct.value.typeName) {
              this.product.type = {
                id: type.id,
                name: type.name,
              };
            }
          });
          // alert(4)
          // console.log(this.file)
          // console.log(this.product)
          this.productservice.saveProductImage(this.file, this.product);
        }
      }

  }

  // getting the products
  getProducts() {
    this.products=[];
    this.productservice.getProducts().subscribe((data) => {
      this.products = this.products.concat(data)
      ;

    });
  }
img1!:any
  //getting the images
  getImages() {
    this.images=[];
    this.productservice.getImages().subscribe((data) => {
      //this.img1="http://localhost:8000/media/images/None/p.png"
      this.images = this.images.concat(data);
      console.log(this.images)
      this.images.forEach((o)=>this.img1=o.image_url)
      //console.log(this.img1)
    });
  }

  // edit the Product
  editProduct(product: Product) {

    this.heading="Edit Product"
    this.editProductId = product.id;
    //this.product.id =product.id
    this.saveProduct.patchValue({
      id:product.id,
      typeName: product.type.name,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity: product.quantity,
      description: product.description,
      // image : product.image_id
    });
    this.show = !this.show;
  }

  // delete the product
  deleteProduct(id : number) {
    //confirm('Are You sure Want to Delete!');
    this.productservice.deleteProduct(id);
  }

  goToProduct()
>>>>>>> Stashed changes
  {
    this.openDialog();
  }

  deleteProduct()
  {
    confirm("Are You sure Want to Delete!");
  }
}
