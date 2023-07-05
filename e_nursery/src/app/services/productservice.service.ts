import { Router } from '@angular/router';
import { Image } from '../model/image';
import { Product } from '../model/product';
import { ProductRepository } from './../repository/product-repository.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class Productservice {

  image!:Image;
  productData!:Product

  constructor(private productRepository:ProductRepository,private router:Router) { }

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
    // imageData.append('id);
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
      console.log("+++++++++++++")
      //console.log(product.image)
       //product.image=data.id

       console.log(product)
       this.saveProduct(product)
    });

  }

    //saving product
    saveProduct(product:Product)
    {
        this.productRepository.saveProduct(product).subscribe((data)=>{
        if(typeof(data)=='string') //checking data is in string
        {
          if(data=='not added') //checking email is present or not
          {
            //sweetalert for email present
            Swal.fire({
              icon: 'error',
              title: 'Product not Added',
              text: 'Try again!',
            });
          }
          else(data=='product added')
          {
            Swal.fire({
              icon: 'success',
              title: 'Product Added Succesfully!',
              text: '',
            });
            this.router.navigateByUrl("admin/product");
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
      console.log("updating.........")
      console.log(product.image_id)
      console.log(data.id)
      this.updateProduct(product)
    });
    }

    //upade product
    updateProduct(product : Product)
    {
      this.productRepository.updateProduct(product).subscribe((data)=>{
        if(typeof(data)=='string') //checking data is in string
        {
          if(data=='not added') //checking email is present or not
          {
            //sweetalert for email present
            Swal.fire({
              icon: 'error',
              title: 'Product not Updated',
              text: 'Try again!',
            });
          }
          else(data=='product added')
          {
            Swal.fire({
              icon: 'success',
              title: 'Product Updated Succesfully!',
              text: '',
            });
            this.router.navigateByUrl("admin/product");
          }
        }

      })
    }

   //for get the products
   getProducts()
   {
     return this.productRepository.getProducts();
   }

   getImages()
   {
     return this.productRepository.getImages();
   }

   //delete Product
   deleteProduct(id : number)
   {
    return this.productRepository.deleteProduct(id).subscribe((data)=>{
      if(typeof(data)=='string') //checking data is in string
      {
        if(data=='not added') //checking email is present or not
        {
          //sweetalert for email present
          Swal.fire({
            icon: 'error',
            title: 'Product not Deleted',
            text: 'Try again!',
          });
        }
        else(data=='product added')
        {
          Swal.fire({
            icon: 'success',
            title: 'Product Deleted Succesfully!',
            text: '',
          });
          this.router.navigateByUrl("admin/product");
        }
      }

    })
   }
}


