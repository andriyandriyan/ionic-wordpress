import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-detail-post',
    templateUrl: 'detail-post.html',
})
export class DetailPostPage {
    post: any
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.post = this.navParams.get('content')
    }
    
    ionViewDidLoad() {
        console.log(this.post)
    }
    
}
