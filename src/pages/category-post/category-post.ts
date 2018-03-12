import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api';
import { DetailPostPage } from '../detail-post/detail-post';

@Component({
    selector: 'page-category-post',
    templateUrl: 'category-post.html',
})
export class CategoryPostPage {
    category: string
    categoryName: string
    posts: any = []
    page: number = 1
    infiniteScroll: boolean = true
    constructor(public navCtrl: NavController, private api: ApiProvider, private loadingCtrl: LoadingController, private navParams: NavParams) {
        this.category = this.navParams.get('category')
        this.categoryName = this.navParams.get('categoryName')
    }
    
    ionViewDidLoad() {
        let loader = this.loadingCtrl.create()
        loader.present()
        this.api.getPostCategory(this.category, this.page).subscribe(data => {
            loader.dismiss()
            for (let i = 0; i < data.length; i++) {
                let image
                if (data[i]['_embedded']['wp:featuredmedia'] != undefined) {
                    image = data[i]['_embedded']['wp:featuredmedia'][0].source_url
                } else {
                    image = 'assets/imgs/not-available.jpg'
                }
                this.posts.push({
                    title: data[i].title.rendered,
                    date: data[i].date,
                    image: image,
                    content: data[i].content
                })
            }
        }, error => console.log(error))
    }
    
    doInfinite(infiniteScroll) {
        this.page += 1
        this.api.getPostCategory(this.category, this.page).subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                let image
                if (data[i]['_embedded']['wp:featuredmedia'] != undefined) {
                    image = data[i]['_embedded']['wp:featuredmedia'][0].source_url
                } else {
                    image = 'assets/imgs/not-available.jpg'
                }
                this.posts.push({
                    title: data[i].title.rendered,
                    date: data[i].date,
                    image: image,
                    content: data[i].content
                })
            }
            infiniteScroll.complete();
        }, error => {
            console.log(error);
            infiniteScroll.complete();
            this.infiniteScroll = false
        })
    }

    toDetail(index) {
        this.navCtrl.push(DetailPostPage, {content: this.posts[index]})
    }
    
}
