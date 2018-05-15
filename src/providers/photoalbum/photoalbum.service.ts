import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoAlbumProvider {
    constructor(public http: Http) {
    }

    getImages(startId:any)
   {
        var endpoint = 'http://localhost:8080/images?startId=' + startId;
        return this.http.get(endpoint).map(res => res.json());
   }
}