const MovieCard = ({name, description, image}) => {
    return ( 
        <>
          <div className='w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{name}</h3>
            
            <img
                src={image}
                alt={`${name} poster`}
                className="h-48 w-full object-cover"
                loading="lazy"
            />

            <p>{description}</p>
            <div>
                Reviews
            </div>
        </div>   
        </>
     );
}
 
export default MovieCard;

