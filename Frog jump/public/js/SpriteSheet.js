export class SpriteSheet{
    //image (slika,koliki je ta slika froga)
    constructor(image,width,height){
        this.image=image;
        this.width=width;
        this.height=height;
        this.sprites=new Map();
    }
    //difine sprite 
    define(name,x,y,width,height){
        //crata se na novi 
        const buffer=document.createElement('canvas');
        buffer.width=this.width;
        buffer.height=this.height;
        buffer.getContext('2d')
              .drawImage(
                  this.image,x,y,this.width,this.height,
                  x,y,width,height);
        //map je objekat sa key,value gde cemo setovati name kao key a buffer kao value
        this.sprites.set(name,buffer);
        console.log(this.sprites);
    }
}