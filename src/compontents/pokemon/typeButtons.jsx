

export const TypeButton = (props) =>
{


    const onDeactivate = ( deleted_type ) => {
        props.update( props.active.filter( item => item !== deleted_type ) );
    }

    const onActivate = ( add_type ) => {
        props.update([
            ...props.active, add_type]);
    }


    const handle_type_input = (event) => {
        if( props.active.includes( event.target.value ) ){
            onDeactivate( event.target.value );
        }else{
        onActivate( event.target.value );
        }
    }
    
    return (
        <label>
                        <input type="checkbox" class="hidden peer " value={props.type} onChange={ handle_type_input }></input>
                        <span class="realtive inline-block float-left bg-white/60 m-1 p-2 rounded-lg transition-all duration-300 hover:bg-white/80 cursor-pointer peer-checked:bg-green-600 "> {props.type} </span>
        </label>
    );
}