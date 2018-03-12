# Ionic Wordpress
Blog Application Using Ionic 3 and Wordpress API

### Demo App
You can check demo app on [http://andriyandriyan.com/ionic-wordpress](http://andriyandriyan.com/ionic-wordpress)
<p>I'm using API from website <a href="https://rumaysho.com" target="_blank">Rumaysho.Com</a></p>

### Installation
Download or you can clone this repo using following command
```sh
$ git clone https://github.com/andriyandriyan/ionic-wordpress.git
```
Move your directory to this folder app and then install dependency using following command
```sh
$ cd ionic-wordpress
$ npm install
```
Open this project using your favorite text editor (I used VSCode).
Open file `src/providers/api.ts` and change `private base_url: string = 'http://rumaysho.com/wp-json/wp/v2/';` with your website.

Run your ionic app using following command
```sh
$ ionic serve
```
Your app is running on [http://localhost:8100](http://localhost:8100)
