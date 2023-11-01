import { Injectable } from '@angular/core';
import { UserInterface } from "../models/user.interface";
import {
  Auth,
  createUserWithEmailAndPassword, getAuth, onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public isUserLoggedIn: boolean = false;

  constructor(private auth: Auth) {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      this.isUserLoggedIn = user !== null;
    });
  }

  register(user : UserInterface) {
    const { email, password } = user;
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginByEmailAndPassword(user: UserInterface) {
    const { email, password } = user;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
