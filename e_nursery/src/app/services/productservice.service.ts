import { Product } from './../model/product';
import { Router } from '@angular/router';
import { Image } from '../model/image';
import { ProductRepository } from './../repository/product-repository.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class Productservice {
  products:Product[]=[];
  images:Image[]=[];

  image!:Image;
  productData!:Product

  constructor(private productRepository:ProductRepository,private router:Router) {
    this.productRepository.getProducts().subscribe(data =>{
      this.products=data;
   });

      this.productRepository.getImages().subscribe(data =>{this.images=data});
   }

  //for get the types
  getTypes()
  {
    return this.productRepository.getTypes();
  }

  // foe save image and product details
  saveProductImage(image:any,product:Product)
  {
    const imageData=new FormData();
    console.log(image)
    imageData.append('image',image,image.name); //put image in form data object
    //foe save the image
    console.log("image=data")
    //console.log(imageData)
    this.productRepository.saveImage(imageData).subscribe(data=>{
      console.log(data.id);
      console.log(typeof(data.id))
      // console.log(typeof(product.image.id))
      // const jsonResponse = JSON.parse(data);
      // image.id=jsonResponse[0].pk;
      // image.image_data=jsonResponse[0].fields.image_data
      product.image_id=data.id;
      //console.log("+++++++++++++")
      //console.log(product.image)
       //product.image=data.id
      this.images.push(data)
       //console.log(product)
       this.saveProduct(product)
    });

  }

    //saving product
    saveProduct(product:Product)
    {
        this.productRepository.saveProduct(product).subscribe((data)=>{
        this.products.push(data)
        if(typeof(data)=='object') //checking data is in string
        {
            Swal.fire({
              icon: 'success',
              title: 'Product Added Succesfully!',
              text: '',
            });
        }
        if(typeof(data)=='string')
        {
          if(data==='not added' || data==='save product data ia not valid change')
          {
            Swal.fire({
              icon: 'error',
              title: 'Failed to add product !',
              text: 'Try again !',
            });
          }
        }
      })
    }

    //update image and product
    updateProductImage(image:any,product:Product)
    {
      const imageData=new FormData();
      console.log(image)
      imageData.append('image',image,image.name); //put image in form data object
      //foe save the image
      this.productRepository.saveImage(imageData).subscribe(data=>{
      // const jsonResponse = JSON.parse(data);
      // image.id=jsonResponse[0].pk;
      // image.image=jsonResponse[0].fields.image
      product.image_id=data.id
      this.updateProduct(product)
    });
    }

    //upade product
    updateProduct(product : Product)
    {
      this.productRepository.updateProduct(product).subscribe((data)=>{
        if(typeof(data)=='string') //checking data is in string
        {
          if(data=='not updated') //checking email is present or not
          {
            Swal.fire({
              icon: 'error',
              title: 'Product not Updated',
              text: 'Try again!',
            });
          }
        }
          if(typeof(data)=='object')
          {

              Swal.fire({
                icon: 'success',
                title: 'Product Updated Successfully !',
                text: '',
              });
        }

      })
    }

    // updateProductOnly(product : Product)
    // {
    //   this.productRepository.updateProduct(product).subscribe((data)=>{
    //     if(typeof(data)=='string') //checking data is in string
    //     {
    //       if(data=='not updated') //checking email is present or not
    //       {
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Product not Updated',
    //           text: 'Try again!',
    //         });
    //       }
    //     }
    //       if(typeof(data)=='object')
    //       {

    //           Swal.fire({
    //             icon: 'success',
    //             title: 'Product Updated Successfully !',
    //             text: '',
    //           });
    //     }

    //   })
    // }

   //for get the products
   getProducts()
   {
    return this.products;
   }

   getImages()
   {
     return this.images;
   }

   //delete Product
   deleteProduct(id : number)
   {
    return this.productRepository.deleteProduct(id).subscribe((data)=>{
      console.log(data)
      console.log("deleting product")
      const productIndex=this.products.findIndex((product)=>product.id===data.id)
      const imageIndex=this.images.findIndex((image)=>image.id===data.image_id)
      this.products.splice(productIndex,1)
      this.images.splice(imageIndex,1)

      if(typeof(data)=='object') //checking data is in string
      {
          Swal.fire({
            icon: 'success',
            title: 'Product Deleted Succesfully!',
            text: '',
          });
      }
    });
   }

   //getting plants only by using
   getPlants(){
    // console.log("getplants()")
    // console.log(this.products)
    // console.log(this.getProducts())
    return this.products.filter( p => p.type.id==1);
   }


   getAccessories(){
    return this.products.filter( p => p.type.id==2);
   }

}


