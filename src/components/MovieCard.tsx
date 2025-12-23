import { NavLink } from "react-router-dom";

export const MovieCard = ({name, description, image}) => {
    
    const style = {
    width: "100%",
    height: "100%",
    objecFit: "contain"
   }

    return ( 
        <>
          <div className='w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h1 className="text-base font-semibold text-slate-900 dark:text-white">{name}</h1>
            
            <img style={style}
                src={image}
                alt={`${name} poster`}
                className="h-48 w-full object-cover"
                loading="lazy"
            />

            <p>{description}</p>
            <div>
                <NavLink
                    to="reviews/new"
                    className="text-blue-600 hover:underline"
                >
                    Leave A Review?
                </NavLink>
                
            </div>
        </div>   
        </>
     );
}
 


