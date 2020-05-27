import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const BaseEndpoint = `http://${environment.host}/`;
export const EndPoints =  {
  Register: `${BaseEndpoint}api/Users/register`,
    Login: `${BaseEndpoint}api/Users/authenticate`,
    SignalR : `${BaseEndpoint}chats`,
    FetchUsers: `${BaseEndpoint}api/Users/FindUsers`,
    TestToken: `${BaseEndpoint}api/ChecksOnBoot/testToken`
    // dislikeEndpoint : BaseEndpoint+"api/Youtube/Dislike",
    // downAudioEndpoint : BaseEndpoint+"api/Youtube/GetAudio",
    // downVideoEndpoint : BaseEndpoint+"api/Youtube/DownVideo"
};

export const jsonHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Response-Type': 'application/json'
});
export const plainTextHeaders = new HttpHeaders({
  'Content-Type': 'text/plain; charset=UTF-8',
  'Response-Type': 'text/plain; charset=UTF-8'
});
export const plainTextAuthHeaders = new HttpHeaders({
  'Content-Type': 'text/plain; charset=UTF-8',
  'Response-Type': 'text/plain; charset=UTF-8',
  'Bearer': localStorage.getItem("Bearer")
});
export const jsonAuthHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Response-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.Bearer}`
});
export const jsonAuthHeadersObj = {
  'Content-Type': 'application/json',
  'Response-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.Bearer}`
};
export const BlobRequestOptions = () => {
 return {headers: jsonHeaders, responseType: 'blob' as 'json' }
}
export const plainTextAuthOpts = () => {
  return {headers: plainTextAuthHeaders, responseType: 'text/plain' }
}
export const JsonPostOptions = () => {
    return {headers: jsonHeaders, responseType: 'json' }
}
export const YoutubeConstants = {
    baseEmbed: 'https://www.youtube.com/embed/'
}
