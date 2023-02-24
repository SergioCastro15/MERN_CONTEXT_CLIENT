import { useEffect } from 'react';
import { usePosts } from '../context/postContext';
import { VscEmptyWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { PostCard } from '../components/PostCard';

export const HomePage = () => {
  const context = usePosts();
  const { getPosts, posts } = context;

  useEffect(() => {
    getPosts();
  }, []);

  if(posts.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <VscEmptyWindow className='w-48 h-48 text-white' />
        <h1 className='text-white text-2xl'>There are no posts</h1>
      </div>
    )
  }

  return (
    <div className='text-white'>
      <Link to="/new"> Create new post</Link>
      {
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
      </div>
      }
    </div>
  )
}
