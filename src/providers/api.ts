import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class ApiProvider {
	private base_url: string = 'http://rumaysho.com/wp-json/wp/v2/';
	private headers = new Headers({ 'Content-Type': 'application/json' });
	private options = new RequestOptions({ headers: this.headers });
    
	constructor(private http: HttpClient, private loadingCtrl: LoadingController) {
		console.log('Hello MainProvider Provider');
    }

    getPost(page) : Observable<any> {
        return this.http.get(this.base_url + 'posts?_embed&per_page=20&page=' + page)
    }

    getCategory() : Observable<any> {
        return this.http.get(this.base_url + 'categories?per_page=50')
    }

    getPostCategory(category, page) : Observable<any> {
        return this.http.get(this.base_url + 'posts?_embed&per_page=20&page=' + page + '&categories=' + category)
    }

    search(key: Observable<string>, page) {
        return key.debounceTime(700).distinctUntilChanged().switchMap(
            val => this.searchPost(val, page)
        )
    }

    searchPost(key, page) : Observable<any> {
        let loader = this.loadingCtrl.create()
        loader.present()
        let result = this.http.get(this.base_url + 'posts?_embed&per_page=20&page=' + page + '&search=' + key)
        if (result) {
            loader.dismiss()
            return result
        }
    }
}