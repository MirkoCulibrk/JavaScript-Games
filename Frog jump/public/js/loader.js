// //treba nam neka funkcija loadera samog sheeta
export function loadSpriteSheet(url){
    //moze se staviti neka druga funkcija koja uzima neku promis eima resolve i reject
    return new Promise(resolve=>{
        //image je klasican <img> u njemu treba da postoji src da bi se slika loadova
        const image=new Image();
        image.addEventListener('load',()=>{
            //vraca promise sa celom slikom tj image src
            resolve(image);
        })
        image.src=url;
        
    })
}

