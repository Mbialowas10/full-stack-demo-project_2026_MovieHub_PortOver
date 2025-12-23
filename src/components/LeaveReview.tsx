import { useState } from "react"

export const LeaveReview = () => {
    
    const [name,setName] = useState("");
    const [rating, setRating] = useState("");
    const [review,setReview] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        const reviewData = {
            name,
            rating,
            review
        }
        console.log("Review submitted:", reviewData);

        // save to json file for later use?
    };

    const styles = {
    form: `
      max-w-lg mx-auto mt-8
      rounded-xl bg-white p-6 shadow-md
      flex flex-col gap-4
    `,
    input: `
      rounded-md border border-gray-300
      px-4 py-2
      text-gray-900
      focus:outline-none focus:ring-2 focus:ring-blue-500
    `,
    textarea: `
      rounded-md border border-gray-300
      px-4 py-2 min-h-[120px]
      resize-y
      focus:outline-none focus:ring-2 focus:ring-blue-500
    `,
    button: `
      self-end
      rounded-lg bg-blue-600
      px-6 py-2
      font-semibold text-white
      hover:bg-blue-700
      transition
    `,
    label: `
      text-sm font-medium text-gray-700
    `,
  };



    return (  
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className="text-xl font-semibold">Leave a Review</h2>
            <label className={styles.label}>
                Your Name
                <input 
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                    className={styles.input}
                    placeholder="Who are you?"
                    required
                />
            </label>
            <label className={styles.label}>
                Rating
                <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className={styles.input}
                required
                >
                <option value="">Select rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐ 2</option>
                <option value="3">⭐ 3</option>
                <option value="4">⭐ 4</option>
                <option value="5">⭐ 5</option>
                </select>
            </label>
            <label className={styles.label}>
                Review
                <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className={styles.textarea}
                placeholder="What did you think about the movie?"
                required
                />
            </label>

            <button type="submit" className={styles.button}>
                Submit Review
            </button>

        </form>
    );
}
 

