import {Tile} from './tile.jsx';
import { TypeButton } from './typeButtons.jsx';

import pokedex from './assets/pokedex.json'
import types from './assets/types.json'
import { useRef, useState } from "react";


// let key = 'Normal';
// update_type_status({
//     ...active_types, [key]: { ...active_types[key], status: true }
// });
//const [active_types, update_type_status] = useState(activeTypesBufor);

const data_types = types;



export const View = () =>
{
    const [active_types, update_type_status] = useState( [] );
    
    //Filtrowanie zmienne
    const [filtered_name, set_filtered_name] = useState('');
    const filter_input = useRef();

    //Order by id
    const sortType_input = useRef();
    const [sortType, set_sortType] = useState('');

    //Order by name 
    const order_input = useRef();
    const [order, set_order] = useState('');

    //Changing value on input handlers 
    const handle_sortType_input = () =>{
        const value = sortType_input.current.value;
        set_sortType(value);
    }

    const handle_order_input = () =>{
        const value = order_input.current.value;
        set_order(value);
    }

    const handle_filter_input = () => {
        const value = filter_input.current.value;
        set_filtered_name(value);
    };



    //FILTER BY NAME 
    let data_pokedex = pokedex;
    data_pokedex = data_pokedex.filter((element) => {
        const pokemon_name = element.name.english.toLowerCase();
        return pokemon_name.includes(filtered_name.toLowerCase());
    });

    if( active_types.length > 0 ){
        data_pokedex = data_pokedex.filter((element) => {
            const pokemon_types = element.type;
            
            return pokemon_types.some( type=> active_types.includes( type ) )

        });
    }

    //ORDER BY NAME AND ID 
    if(sortType !== ''){
        
        switch(sortType) {
            //by name
            case "name":
            
            if(order === 'asc'){
                data_pokedex.sort(function (a, b) {
                    return a.name.english.localeCompare(b.name.english);
                });
            }
            else if(order === 'desc'){
                data_pokedex.sort(function (a, b) {
                    return b.name.english.localeCompare(a.name.english);
                });
            }
    
            break;

            //by id
            case "id":
                if( order === 'desc'){
                    data_pokedex = data_pokedex.sort(function(a, b){
                        return b.id - a.id;
                    });
                }
            break;

            //default
            default:
                break;
          }


    }
    



    const test2 = () => {
        console.log(active_types)

    }


    return (


        <div class="flex w-screen h-screen justify-center items-center bgImage">
            <button onClick={test2}> Test2 </button>


            <div class="w-2/5 h-5/6 p-4 rounded-3xl bg-white/50 blur-none">    


                <div class="w-full h-2/6 2xl:h-1/6  ">
                        {/* Name input for filtring  */}
                        <div>
                        <input placeholder='Search' ref={filter_input} type="text" onChange={handle_filter_input}  class="bg-[#1D1D24]/70 p-1 float-left w-28 h-10 rounded-xl text-gray-300  focus:outline-none transition-all duration-500 sm:w-24  lg:w-40 xl:w-60 2xl:w-72  "/>

                        {/* Order by selection   */}
                        <select ref={order_input} onChange={handle_order_input} class="bg-[#1D1D24]/70  p-1  h-10 rounded-xl text-gray-300 float-left focus:outline-none transition-all duration-500 sm:float-left ml-2 lg:float-right">
                            <option disabled selected >Asc/Des</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    
                        {/* Sort by selection   */}
                        <select ref={sortType_input}  onChange={handle_sortType_input}  class="bg-[#1D1D24]/70  p-1 mr-2 h-10 rounded-xl text-gray-300 float-left focus:outline-none transition-all duration-500 sm:float-left ml-2  lg:float-right">
                            <option disabled selected >Sort By</option>
                            <option value="name">Name</option>
                            <option value="id">ID</option>
                        </select>
                        </div>

                        {/* Types buttons  */}
                        
                        <div class="flex-col float-left p-1 mt-2 rounded-lg bg-white/30">
                        {
                            data_types.map((element) => {
                                return(
                                    <TypeButton update={update_type_status} active={active_types} type={element.english}> </TypeButton>
                                )
                            })
                        }
                        </div>

                </div>


                <div class="w-full h-1/6 overflow-auto mt-2 sm:h-2/6 md:h-3/6 lg:h-4/6 2xl:mt-20">
                    {
                        data_pokedex.map((elem) =>
                        {
                            return (

                                <Tile name={elem.name.english} id={elem.id} >  </Tile>

                            );

                        })

                    }
                </div>
            
            </div>

        
        </div>
    );
   
}


