import {SpriteSheet} from './SpriteSheet.js';
import {loadSpriteSheet} from './loader.js';
//vraca promise i ako je deo resen
export function loadFrog(){
    return loadSpriteSheet('/img/FroggerSheet.png')
    //then ce vratiti promise jebem mu mamu
            .then((image)=>{
                console.log(image);
                //slika je img src="" ova dva su width i height koji ce biti width i heigth od canvas
                const sprite=new SpriteSheet(image,64,64);
                console.log(image)
                sprite.define('frog',5,5,64,64);
                console.log(sprite)
                return sprite;
            })
}
export function loadBackground(){
    return loadSpriteSheet('/img/characters.gif')
    .then(image=>{
        //make new spritesheet
        console.log(image)
        const sprites= new Spritesheet(image,16,16);
        //define type of sky sprite
        sprites.define('idle', 276, 44, 16, 16);
        console.log(sprites);
        return sprites;
    });
}