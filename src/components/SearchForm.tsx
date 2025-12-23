import { useState } from "react";

const SearchForm = ({onSearch}) => {

    const styles = {
        form: `
        flex items-center gap-3
        max-w-md mx-auto mt-6
        rounded-xl bg-white p-4 shadow-md
  `,
  input: `
    flex-1
    rounded-lg
    border border-gray-300
    px-4 py-2
    text-gray-900
    placeholder-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
  `,
  button: `
    rounded-lg
    bg-blue-600
    px-5 py-2
    font-semibold
    text-white
    hover:bg-blue-700
    active:scale-95
    transition
  `
    }

    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    }

    return ( 
        <form onSubmit={handleSubmit} className={styles.form}>
            <input className={styles.input}
                type="text"
                placeholder="Search..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className={styles.button}>Search TMDB...</button>
        </form>
    );
}
 
export default SearchForm;