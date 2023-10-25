export const Tile = (props) =>
{

    let path = './assets/images/' + props.id.toString().padStart(3, "0") + '.png';
    
    return (
        

            <div class="flex flex-col mt-3 ml-1 float-left w-20 h-28 rounded-2xl  justify-center items-center bg-black/30 sm:w-24 text-sm md:text-base w-24 lg:w-28   ">
        
                <img class ="" width="70" height="70" src={require(`${path}`)} alt=""></img>
                <p class="">{props.name}</p>
         
            </div>

    
    );
}
