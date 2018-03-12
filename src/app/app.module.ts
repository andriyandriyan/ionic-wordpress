import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoryPostPage } from '../pages/category-post/category-post';
import { DetailPostPage } from '../pages/detail-post/detail-post';
import { SearchPage } from '../pages/search/search';

import { HttpClientModule } from '@angular/common/http'
import { ApiProvider } from '../providers/api';
import { HighlightModule } from 'ngx-highlightjs';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        DetailPostPage,
        CategoryPostPage,
        SearchPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        HighlightModule.forRoot(),
        LazyLoadImageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        DetailPostPage,
        CategoryPostPage,
        SearchPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        ApiProvider
    ]
})
export class AppModule {}
