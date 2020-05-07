import { HttpHeaders } from '@angular/common/http';


const BaseEndpoint = "http://192.168.8.117:5000/";//43.32:5001/";
export const EndPoints =  {
  Register: BaseEndpoint+"api/Users/register",
    Login: BaseEndpoint+"api/Users/authenticate",
    SignalR : BaseEndpoint+"/chats",
    // dislikeEndpoint : BaseEndpoint+"api/Youtube/Dislike",
    // downAudioEndpoint : BaseEndpoint+"api/Youtube/GetAudio",
    // downVideoEndpoint : BaseEndpoint+"api/Youtube/DownVideo"
};
const header = {
    headers : new HttpHeaders({
        method:'POST',
        Content:'application/json'
    })
};
const simpleJsonContentHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'method' : 'POST'
});
const headerData = (data: object) => {
  return {
    headers: new HttpHeaders({
      method: 'POST',
      Content: 'application/json'
    })
  }
};

export const AppHeaders =  {
    GetHeader: {
      headers: new HttpHeaders({
        method:'GET',
        responseType: 'application/json'
    })
  },
    PostJsonContentTypeHeader: header,
    PostJsonContentTypeHeaderPassParam: headerData,
    SimpleJsonContentHeader: simpleJsonContentHeader

};
export const BlobRequestOptions = () => {
 return {headers: simpleJsonContentHeader, responseType: 'blob' as 'json' }
}
export const JsonPostOptions = () => {
    return {headers: simpleJsonContentHeader, responseType: 'json' }
}
export const YoutubeConstants = {
    baseEmbed: 'https://www.youtube.com/embed/'
}
