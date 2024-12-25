import { useState } from "react"
import articleArray from "./data/articleArray"

function App() {
  const [post, setPost] = useState(articleArray)
  const [newPost, setNewPost] = useState('')

  // Stato per tracciare il submit
  const [submitted, setSubmitted] = useState(false)

  const sendPost = event => {
    event.preventDefault()

    // Aggiungi il nuovo post all'array
    setPost([...post, { id: Date.now(), title: newPost }])
    setNewPost('')

    // Imposta submitted a true quando si invia un post
    setSubmitted(true)
  }

  const deletePost = (postId) => {
    setPost(post.filter(post => post.id !== postId))
  }

  return (
    <>
      <div className="container">
        <div className="submit-area">
          <form onSubmit={sendPost}>
            <label htmlFor="desc" className="space">Post content</label>
            <input className="space"
              type="text"
              name="desc"
              id="desc"
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
            />
            <button type='submit' className="space">Submit</button>
          </form>
        </div>

        {/* Mostra "No posts available" prima del submit e nessun post */}
        {!submitted ? (
          <p>No posts available</p>
        ) : (
          // Dopo il submit, mostra i post
          post.map(curPost => (
            <div key={curPost.id} className="space-up-down">
              {curPost.title}
              <button onClick={() => deletePost(curPost.id)} className="space">Delete</button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App
