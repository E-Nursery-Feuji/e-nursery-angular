import { Admin } from '../model/admin';
import { AdminRepository } from './../repository/admin-repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private adminRepository : AdminRepository) { }

  saveAdmin(admin : Admin)
  {
    return this.adminRepository.saveAdmin(admin).subscribe((data)=>console.log(data))
  }
}
