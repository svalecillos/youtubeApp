import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private apiKey:string = "AIzaSyAkZlgpuUDtxhhJuyTmr2RTnhQkUiNOJmA";
  private playlist:string = "UUVdg9q21qjYjBnxp8pMGKvw";
  private nextPageToken:string = "";

  constructor( private http:HttpClient ) { }

  getVideos(){

    let url = `${ this.youtubeUrl }/playlistItems`;
    //pasando los parametros a la URL
    let params = new HttpParams()
    .set( 'part', 'snippet', )
    .set( 'maxResults', '10')
    .set( 'playlistId', this.playlist)
    .set( 'key', this.apiKey);

    return this.http.get(url, { params }).pipe(
            map( res=>{
              console.log(res);
              this.nextPageToken = res.nextPageToken;

              let videos:any[]=[];
              for( let video of res.items){
                let snippet = video.snippet;
                videos.push(snippet);
              }
              return videos;
            })
          );
//UUVdg9q21qjYjBnxp8pMGKvw
//AIzaSyAkZlgpuUDtxhhJuyTmr2RTnhQkUiNOJmA
  }

}
