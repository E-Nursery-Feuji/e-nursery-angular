import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})


export class JwttokenService {

  //checking that user is login or not
  isLoginned(){
    if(localStorage.getItem('token') != null){
      return true;
    }else{
      return false;
    }
  }

  constructor() { }

  // to get the first name from token
  getFirstNameFromToken()
  {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    if (token) {
      const helper = new JwtHelperService(); // Create an instance of JwtHelperService
      const decodedToken = helper.decodeToken(token); // Decode the JWT token

      if (decodedToken && decodedToken.first_name) {
        return decodedToken.first_name; // Return the value of the first_name property
      }
    }

    return null; // Return null if the token is null or the first_name property is not found
  }

  //to get the email from token
  getEmailFromJwtToken()
  {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    if (token) {
      const helper = new JwtHelperService(); // Create an instance of JwtHelperService
      const decodedToken = helper.decodeToken(token); // Decode the JWT token

      if (decodedToken && decodedToken.email) {
        return decodedToken.email; // Return the value of the email property
      }
    }

    return null; // Return null if the token is null or the email property is not found
  }

  // to get the role from token
  getRoleFromJwtToken()
  {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    if (token) {
      const helper = new JwtHelperService(); // Create an instance of JwtHelperService
      const decodedToken = helper.decodeToken(token); // Decode the JWT token

      if (decodedToken && decodedToken.role) {
        return decodedToken.role; // Return the value of the role property
      }
    }

    return null; // Return null if the token is null or the role property is not found
  }
}
