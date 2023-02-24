import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePosts } from '../context/postContext';
import { useNavigate, useParams, Link } from 'react-router-dom';

export const PostForm = () => {
  const context = usePosts();
  const { createPost, getPost, post, updatePost } = context;
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
        if(params.id) {
          await getPost(params.id);
        }
    })();
  }, [])

  // importante recordar que el initialValue en nordic se relaciona con los input con la etiqueta name
  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <Link to="/new" className="text-xl">New Post</Link>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go Back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required('title is required'),
            description: Yup.string().required('description is required'),
          })}
          onSubmit={ async (values, actions) => {
            if(params.id) {
              await updatePost(params.id, values)
            } else {
              await createPost(values);
            }
            navigate('/')
          }}
          enableReinitialize
        >
          { ({handleSubmit}) => (
            <Form onSubmit={handleSubmit}>
                <label
                  htmlFor="title"
                  className="text-sm block font-bold mb-2 text-gray-400"
                >
                  Title
                </label>
              <Field 
                component="textarea" 
                name="title" 
                placeholder="title" 
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
              />
              <ErrorMessage component='p' className='text-red-400 text-sm' name='title'/>

              <label
                  htmlFor="title"
                  className="text-sm block font-bold mb-2 text-gray-400"
                >
                  Description
                </label>

              <Field
                component="textarea" 
                name="description" 
                placeholder="description"
                className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
                rows="3"
              />
              <ErrorMessage component='p' className='text-red-400 text-sm' name='description'/>

              <button 
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                type='submit'
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
