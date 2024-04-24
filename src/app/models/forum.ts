import { coments } from "./comments";


export interface Postagens {
    postID: string; 
    title: string;
    content: string;
    comments?: coments[];
  }