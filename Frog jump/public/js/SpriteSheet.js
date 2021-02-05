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
        //height i width od canvasa
        buffer.width=width;
        buffer.height=height;
        buffer.getContext('2d')
              .drawImage(
                  //pozicija odakle se crta slika x,y pozicija i njena sirina
                  this.image,x,y,this.width,this.height,
                  //pozicija gde ce se crtatiti na canvasu
                  0,0,width,height);
        //map je objekat sa key,value gde cemo setovati name kao key a buffer kao value
        this.sprites.set(name,buffer);
        console.log(this.sprites);
    }
    //poziva se ovo da bi se crtalo,
    draw(name,context,x,y){
        //uzimanje iz map se radi uz pomocu get metode gde se trazi neki key
        const buffer=this.sprites.get(name);
        context.drawImage(buffer,x,y);
    }
}