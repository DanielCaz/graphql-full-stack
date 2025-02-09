import { generateClient } from "aws-amplify/api";
import "./App.css";
import { getPosts } from "./graphql/queries";
import { useEffect, useState } from "react";
import { GetPostsQuery } from "./API";

const client = generateClient();

function App() {
  const [posts, setPosts] = useState<GetPostsQuery["getPosts"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.graphql({ query: getPosts });
        setPosts(data.getPosts);
      } catch (err) {
        setError(`Error fetching posts: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Welcome to the App!</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {posts?.map((post) => (
          <li key={post?.id}>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
