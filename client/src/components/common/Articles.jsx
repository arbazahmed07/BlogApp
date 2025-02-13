import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

function Articles() {
  const [articles, setArticles] = useState([])
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const navigate = useNavigate()
  const { getToken } = useAuth()

  const fetchArticles = async (category = '') => {
    try {
      setError('')
      const token = await getToken()
      const url = category
        ? `http://localhost:3000/author-api/articles/filter/${category}`
        : 'http://localhost:3000/author-api/articles'

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.data.message === 'articles') {
        setArticles(res.data.payload)
        setError('')
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError('An error occurred while fetching articles.')
    }
  }

  const handleCategoryChange = (event) => {
    const category = event.target.value
    setSelectedCategory(category)
    fetchArticles(category)
  }

  useEffect(() => {
    fetchArticles() 
  }, [])

  const gotoArticleById = (articleObj) => {
    navigate(`../${articleObj.articleId}`, { state: articleObj })
  }

  return (
    <div className="container">
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="form-select"
      >
        <option value="">All Categories</option>
        <option value="AI&ML">AIML</option>
        <option value="database">DATABASE</option>
        <option value="programming">PROGRAMMING</option>
      </select>

      {error && <p className="display-4 text-center mt-5 text-danger">{error}</p>}

      {articles.length === 0 ? (
        <p className="text-center mt-5">No articles found for this category.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {articles.map((articleObj) => (
            <div className="col" key={articleObj.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  {/* author image */}
                  <div className="author-details text-end">
                    <img
                      src={articleObj.authorData.profileImageUrl}
                      width="40px"
                      className="rounded-circle"
                      alt=""
                    />
                    {/* author name */}
                    <p>
                      <small className="text-secondary">
                        {articleObj.authorData.nameOfAuthor}
                      </small>
                    </p>
                  </div>
                  {/* article title */}
                  <h5 className="card-title">{articleObj.title}</h5>
                  {/* article content up to 80 chars */}
                  <p className="card-text">
                    {articleObj.content.substring(0, 80) + '....'}
                  </p>
                  {/* read more button */}
                  <button
                    className="custom-btn btn-4"
                    onClick={() => gotoArticleById(articleObj)}
                  >
                    Read more
                  </button>
                </div>
                <div className="card-footer">
                  {/* article's date of modification */}
                  <small className="text-body-secondary">
                    Last updated on {articleObj.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Articles
