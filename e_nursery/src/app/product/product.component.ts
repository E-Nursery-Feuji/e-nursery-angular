import { Productservice } from './../services/productservice.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { Image } from '../model/image';
import { Type } from '../model/type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //for pagination
  currentPage: number = 1;
  pageSize: number = 4;
  totalItems: number = 0;
  totalPages: number = 0;

  image_link!:any;
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
  fileData: any;

  saveProduct: FormGroup;
  editProductId!: number;
  editImageId!:number;

  show: boolean = true;
  productSearch:String= ""

  //constructor
  constructor(private productservice: Productservice,private formBuilder: FormBuilder) {
    this.saveProduct = this.formBuilder.group({
      id :[''],
      typeName: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      image_id:['']
    });
  }

  ngOnInit(): void {
    console.log("init")

    this.show=true
    this.images=this.getImages();
    this.getTypes(); //foe get the types fro dropdown
    this.products=this.getProducts(); //for get the products in table



    this.getCurrentPageProducts();


  }

  // for open the add product box
  openDialog() {
    this.show = !this.show;
    this.heading="Add Product";
    this.resetForm()
    this.products=this.getProducts();
    this.images=this.getImages();
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
      //image:'',
      image_id:''
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
    if(this.heading==='Edit Product'){
      this.image_link=''
    }
  }

  // save the image & product
  saveImageProduct() {
    this.submitted = true;
    // alert(1)

      if (this.editProductId)//for updating the product
      {
        if(this.image_link===''){   //updating product and image

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
            this.show = !this.show;
        }
        else{    //updating product only

            this.product = this.saveProduct.value; //setting values of product
            this.types.forEach((type) => {         //setting type to product object
              if (type.name == this.saveProduct.value.typeName) {
                this.product.type = {
                  id: type.id,
                  name: type.name,
                };
              }
            });
            this.productservice.updateProduct(this.product);
            this.editProductId = 0;
            this.show = !this.show;

        }


      }
      else   //for saving the product
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
          this.productservice.saveProductImage(this.file, this.product);
          this.clearForm();
        }
        else{
          return
        }
      }

  }

  // getting the products
  getProducts() {

    this.products=this.productservice.getProducts().reverse();

    return this.products;
  }

//for pagination methods start
  changePage(pageNumber: number) {
    // this.products=this.getProducts();
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  getCurrentPageProducts(): Product[] {
    if (this.productSearch===""){
      this.getProducts();
      this.totalItems = this.products.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.products.slice(startIndex, endIndex);
    }
   else{
      let searchTerm = this.productSearch.trim().toLowerCase();
      return this.productservice.getProducts().filter(a => a.name.toLowerCase().includes(searchTerm)|| a.type.name.toLowerCase().includes(searchTerm))
  }
}
  //for oagination method ends

  //getting the images
  getImages() {

   return this.productservice.getImages();
  }

  // edit the Product
  editProduct(product: Product) {


    this.heading="Edit Product"
    this.editProductId = product.id;
    this.saveProduct.patchValue({
      id:product.id,
      typeName: product.type.name,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity: product.quantity,
      description: product.description,
      image_id: product.image_id,
    });
    this.images=this.getImages();
    this.images.forEach((image)=>{
      if(image.id==product.image_id)
      {
        this.editImageId=product.image_id
        this.image_link=image.image_url
      }
    })
    this.show = !this.show;
  }

  // delete the product
  deleteProduct(id : number) {
    confirm('Are You sure Want to Delete!');
    this.productservice.deleteProduct(id)

  }

  goToProduct()
  {
    confirm("Are You sure Want to Delete!");
  }

//clear form
clearForm() {
  this.saveProduct.reset();
  this.saveProduct.markAsPristine();
  this.saveProduct.markAsUntouched();
  Object.keys(this.saveProduct.controls).forEach(key => {
  this.saveProduct.controls[key].setErrors(null);
  });

}
}
