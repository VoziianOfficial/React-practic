import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostByUserId } from "../../services/api";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPostByUserId(postId);
      setPost(data);
    };
    getData();
  }, [postId]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <h3>{post.body}</h3>
      <p>LIKES:{post.reactions.likes}</p>
      <p>DISLIKES:{post.reactions.dislikes}</p>
    </div>
  );
};

export default PostDetails;
