import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { ApiProvider } from '../../providers/api';
import { DetailPostPage } from '../detail-post/detail-post';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {
    searchValue = new Subject<string>()
    posts: any = []
    page: number = 1
    infiniteScroll: boolean = true
    constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiProvider) {
        this.api.search(this.searchValue, this.page).subscribe(data => {
            this.posts = []
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
        })
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad SearchPage');
    }
    
    doInfinite(infiniteScroll) {
        this.page += 1
        this.api.searchPost(this.searchValue, this.page).subscribe(data => {
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
        }, error => console.log(error))
    }

    toDetail(index) {
        this.navCtrl.push(DetailPostPage, {content: this.posts[index]})
    }
}
