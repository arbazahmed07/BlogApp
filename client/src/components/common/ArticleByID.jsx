import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { userAutherContextObj } from '../../contexts/userAutherContext'
import { FaEdit } from 'react-icons/fa'
import { MdDelete, MdRestore } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

function ArticleByID() {
  const { state } = useLocation()
  const { currentUser } = useContext(userAutherContextObj)
  const [editArticleStatus, setEditArticleStatus] = useState(false)
  const { register, handleSubmit , reset} = useForm()
  const navigate = useNavigate()
  const { getToken } = useAuth()
  const [currentArticle, setCurrentArticle] = useState(state)
  const [commentStatus, setCommentStatus] = useState('')

  function enableEdit() {
    setEditArticleStatus(true)
  }

  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...currentArticle, ...modifiedArticle }
    const token = await getToken()
    const currentDate = new Date();
    articleAfterChanges.dateOfModification = currentDate.getDate() + "-" + currentDate.getMonth() + "-" + currentDate.getFullYear()

    let res = await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

    if (res.data.message === 'article modified') {
      setEditArticleStatus(false);
      setCurrentArticle(res.data.payload)
      navigate(`/author-profile/articles/${currentArticle.articleId}`, { state: res.data.payload })
    }
  }

  async function addComment(commentObj) {
    commentObj.nameOfUser = currentUser.firstName;
    let res = await axios.put(`http://localhost:3000/user-api/comment/${currentArticle.articleId}`, commentObj);
    if (res.data.message === 'Comment added') {
      setCommentStatus(res.data.message)
      setCurrentArticle(res.data.payload)
      reset();

    }
  }

  async function deleteArticle() {
    const articleToUpdate = { ...currentArticle, isArticleActive: false };
    let res = await axios.put(`http://localhost:3000/author-api/articles/${currentArticle.articleId}`, articleToUpdate)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }

  async function restoreArticle() {
    const articleToUpdate = { ...currentArticle, isArticleActive: true };
    let res = await axios.put(`http://localhost:3000/author-api/articles/${currentArticle.articleId}`, articleToUpdate)
    if (res.data.message === 'article deleted or restored') {
      setCurrentArticle(res.data.payload)
    }
  }

  return (
    <div className='container'>
      {
        editArticleStatus === false ? <>
          <div className="d-flex justify-contnet-between">
            <div className="mb-5 author-block w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
              <div>
                <p className="display-3 me-4">{currentArticle.title}</p>
                <span className="py-3">
                  <small className="text-secondary me-4">
                    Created on : {currentArticle.dateOfCreation}
                  </small>
                  <small className="text-secondary me-4">
                    Modified on : {currentArticle.dateOfModification}
                  </small>
                </span>
              </div>
              <div className="author-details text-center">
                <img src={currentArticle.authorData.profileImageUrl} width='60px' className='rounded-circle' alt="" />
                <p>{currentArticle.authorData.nameOfAuthor}</p>
              </div>
            </div>
            {
              currentUser.role === 'author' && (
                <div className="d-flex me-3">
                  <button className="me-2 btn btn-light" onClick={enableEdit}>
                    <FaEdit className='text-warning' />
                  </button>
                  {
                    currentArticle.isArticleActive ? (
                      <button className="me-2 btn btn-light" onClick={deleteArticle}>
                        <MdDelete className='text-danger fs-4' />
                      </button>
                    ) : (
                      <button className="me-2 btn btn-light" onClick={restoreArticle}>
                        <MdRestore className='text-info fs-4' />
                      </button>
                    )
                  }
                </div>
              )
            }
          </div>
          <p className="lead mt-3 article-content" style={{ whiteSpace: "pre-line" }}>
            {currentArticle.content}
          </p>
          <div>
            <div className="comments my-4">
              {
                currentArticle.comments.length === 0 ? <p className='display-3'>No comments yet..</p> :
                  currentArticle.comments.map(commentObj => {
                    return <div key={commentObj._id}>
                      <p className="user-name">
                        {commentObj?.nameOfUser}
                      </p>
                      <p className="comment">
                        {commentObj?.comment}
                      </p>
                    </div>
                  })
              }
            </div>
          </div>
          <h6>{commentStatus}</h6>
          {
            currentUser.role === 'user' && <form onSubmit={handleSubmit(addComment)}>
              <input type="text" {...register("comment")} className="form-control mb-4" />
              <button className="btn btn-success">
                Add a comment
              </button>
            </form>
          }
        </> :
          <form onSubmit={handleSubmit(onSave)}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                defaultValue={currentArticle.title}
                {...register("title")}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="form-label">
                Select a category
              </label>
              <select
                {...register("category")}
                id="category"
                className="form-select"
                defaultValue={currentArticle.category}
              >
                <option value="programming">Programming</option>
                <option value="AI&ML">AI&ML</option>
                <option value="database">Database</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                {...register("content")}
                className="form-control"
                id="content"
                rows="10"
                defaultValue={currentArticle.content}
              ></textarea>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
      }
    </div>
  )
}

export default ArticleByID