import {SpriteSheet} from './SpriteSheet.js';
import {loadSpriteSheet} from './loader.js';
//vraca promise i ako je deo resen
export function loadFrog(){
    return loadSpriteSheet('/img/spritemap.png')
    //then ce vratiti promise jebem mu mamu
            .then((image)=>{
                console.log(image);
                //slika je img src="" ova dva su width i height koji ce biti width i heigth od canvas
                const sprite=new SpriteSheet(image,80,80);
                console.log(image)
                //defining type of sprite, from where to take postiton take image and size of image
                sprite.define('frog-idle',0,0,40,50);
                sprite.define('car-formula',0,80,50,40);
                console.log(sprite)
                return sprite;
            })
}
