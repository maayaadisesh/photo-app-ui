import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Image } from '../../models/Image';
import { Http } from '@angular/http';
import { PhotoAlbumProvider } from '../../providers/photoalbum/photoalbum.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  images: Array<Image>;
  startId: any = 1;
  loading:boolean;
  tempimages: Array<Image>;
  constructor(public navCtrl: NavController, public http: Http, public dataManager: PhotoAlbumProvider) {
    console.log("Inside constructor : HomePage()");
    this.dataManager.getImages(this.startId).subscribe(res => this.images = res);
    this.startId = this.startId + 11;
  }

  more(infiniteScroll){
    console.log('Loading more data');
    setTimeout(() => {
      this.dataManager.getImages(this.startId).subscribe(res => this.images = this.images.concat(res));
      console.log('More data loaded');
      this.startId = this.startId + 11;
      infiniteScroll.complete();
    }, 500);
   } 
}
