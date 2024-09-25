import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { DoctorLoginService } from "../services/doctor/doctor-login.service";
import { AdminLoginService } from "../services/admin/admin-login.service";


export const AuthDoctorGuard : CanActivateFn = (route, state) => { 
    let authService = inject(DoctorLoginService)
    let adminLogService = inject(AdminLoginService)
    let router = inject(Router)
    if(authService.isUserLogedIn) { 
        if(authService.getUserRole() === "doctor"){
            return true
        }else { 
            router.navigateByUrl("/login")
            return false
        }
    }else{ 
        router.navigateByUrl("/login")
        return false
    }
}

export const AuthAdminGuard : CanActivateFn = (route, state) => {
    let authService = inject(DoctorLoginService)
    let adminLogService = inject(AdminLoginService)
    let router = inject(Router) 
    if(adminLogService.isUserLogedIn){
        if(adminLogService.getAdminRole() == "admin"){ 
            return true
        }else { 
            router.navigateByUrl("/adminlogin")
            return false
        }
    }else { 
        router.navigateByUrl('/adminlogin')
        return false
    }
}

