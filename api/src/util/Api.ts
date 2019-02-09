import { config } from "../config";
const fetch = require('node-fetch');

export class Api {
  private headers = {};
  private url = `https://api.yelp.com/v3/`;

  constructor() {
    this.headers = { 
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${config.keyApiYielp}`
    }
  }

  public async apiGet(rota:string) {
    return await fetch(`${this.url+rota}`,{
        headers: this.headers,
    }).then((res:any) => res.json())
  }

  public async apiPost(rota:string, body:any = null) {
    return await fetch(`${this.url+rota}`,{
        method : 'POST',
        body : JSON.stringify(body),
        headers: this.headers,
    }).then((res:any) => res.json())
  }

  public async apiPut(rota:string, body:any = null) {
    return await fetch(`${this.url+rota}`,{
        method : 'PUT',
        body : JSON.stringify(body),
        headers: this.headers,
    }).then((res:any) => res.json())
  }

  public async apiDelete(rota:string, body:any = null) {
    return await fetch(`${this.url+rota}`,{
        method : 'DELETE',
        body : JSON.stringify(body),
        headers: this.headers,
    }).then((res:any) => res.json())
  }
 
}