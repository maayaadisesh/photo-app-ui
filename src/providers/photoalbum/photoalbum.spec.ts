import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {PhotoAlbumProvider} from './photoalbum.service';

describe('Photo Album Provider', () => {
    

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PhotoAlbumProvider,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    it('Should be able to load images based on startId', inject([PhotoAlbumProvider, XHRBackend], (photoAlbumProvider, mockBackend) => {
        const mockResponse = {
             data: [
                { id: '1', name: 'name 1', imageUrl: 'http://localhost:8080/', createdAt:'123456' },
                { id: '2', name: 'name 2', imageUrl: 'http://localhost:8080/', createdAt:'1234567' }
            ]
        };

        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });

        photoAlbumProvider.getImages(1).subscribe((images) => {
            expect(images.length).toBe(2);
        });
    }));
});