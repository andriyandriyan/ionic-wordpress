import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ApiProvider } from '../providers/api';
import { CategoryPostPage } from '../pages/category-post/category-post';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage:any = HomePage;
    categories: any
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, api: ApiProvider, loadingCtrl: LoadingController) {
        let loader = loadingCtrl.create()
        loader.present()
        api.getCategory().subscribe(data => {
            loader.dismiss()
            this.categories = data
            console.log(this.categories)
        })
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    homePage() {
        this.nav.setRoot(HomePage)
    }

    openPage(index) {
        this.nav.setRoot(CategoryPostPage, {
            category: this.categories[index].id,
            categoryName: this.categories[index].name,
        })
    }
}

