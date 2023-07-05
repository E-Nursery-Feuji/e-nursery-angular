import { Productservice } from './../services/productservice.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Image } from '../model/image';
import { Type } from '../model/type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  heading!:string;
  submitted: boolean = false;
  selectedType?: string;
  product: Product = new Product();
  image: Image = new Image();
  type: Type = new Type();
  types: Type[] = [];
  products: Product[] = [];
  images: Image[] = [];

  file: any;

  saveProduct: FormGroup;
  editProductId!: number;

  show: boolean = true;
  constructor(
    private productservice: Productservice,
    private formBuilder: FormBuilder
  ) {
    this.saveProduct = this.formBuilder.group({
      id :[''],
      typeName: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }






  ngOnInit(): void {
    this.show=true
    this.getImages();
    this.getTypes(); //foe get the types fro dropdown
    this.getProducts(); //for get the products in table
  }

  // for open the add product box
  openDialog() {
    this.show = !this.show;
    this.heading="Add Product";
    this.saveProduct.patchValue({
      id:'',
      typeName: '',
      name:'',
      price:'',
      discount: '',
      quantity: '',
      description: '',
      image:'',
    });
    this.getProducts();
    this.getImages();
  }

  //for clearing the form
  resetForm()
  {
    this.saveProduct.patchValue({
      id:'',
      typeName: '',
      name:'',
      price:'',
      discount: '',
      quantity: '',
      description: '',
      image:'',
    });
  }

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
    this.productservice.getProducts().subscribe((data) => {
      this.products = this.products.concat(data)
      ;

    });
  }
img1!:any
  //getting the images
  getImages() {
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
  {

    confirm("Are You sure Want to Delete!");
  }

}
