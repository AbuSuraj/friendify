import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetchLikes = async () => {
    try {
      setIsLoading(true);
      const response = await makeRequest.get(`/likes?postId=${post.id}`);
      setLikes(response.data);
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const liked = likes.some((like) => like.userId === currentUser.id);
      if (liked) {
        await makeRequest.delete(`/likes?postId=${post.id}`);
        setLikes((prevLikes) => prevLikes.filter((like) => like.userId !== currentUser.id));
      } else {
        await makeRequest.post("/likes", { postId: post.id });
        setLikes((prevLikes) => [...prevLikes, { userId: currentUser.id }]);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await makeRequest.delete(`/posts/${post.id}`);
      // Optionally, you can update the state or perform additional actions
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch likes on component mount

  return (
    <div className="post  mx-auto">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`/upload/${post.img}`} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : likes.some((like) => like.userId === currentUser.id) ? (
              <FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {likes?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;

// import "./post.scss";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { Link } from "react-router-dom";
// import Comments from "../comments/Comments";
// import { useState } from "react";
// import moment from "moment";
// import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// const Post = ({ post }) => {
//   const [commentOpen, setCommentOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["likes", post.id],
//     queryFn: () =>
//       makeRequest.get("/likes?postId=" + post.id).then((res) => {
//         return res.data;
//       }),
//   });

//   const statusUpdate = (liked) => {
//     if (liked) return makeRequest.delete("/likes?postId=" + post.id);
//     return makeRequest.post("/likes", { postId: post.id });
//   }
//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     {mutationfn: statusUpdate,
    
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["likes"]);
//       },
//     }
//   );
//   const deleteMutation = useMutation(
//   { mutationFn: (postId) => {
//       return makeRequest.delete("/posts/" + postId);
//     },
    
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["posts"]);
//       },
//     }
//   );

//   const handleLike = () => {
  
//     mutation.mutate(data.includes(currentUser.id));
//   };

//   const handleDelete = () => {
//     deleteMutation.mutate(post.id);
//   };

//   return (
//     <div className="post">
//       <div className="container">
//         <div className="user">
//           <div className="userInfo">
//             <img src={post.profilePic} alt="" />
//             <div className="details">
//               <Link
//                 to={`/profile/${post.userId}`}
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <span className="name">{post.name}</span>
//               </Link>
//               <span className="date">{moment(post.createdAt).fromNow()}</span>
//             </div>
//           </div>
//           <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
//           {menuOpen && post.userId === currentUser.id && (
//             <button onClick={handleDelete}>delete</button>
//           )}
//         </div>
//         <div className="content">
//           <p>{post.desc}</p>
//           <img src={"/upload/" + post.img} alt="" />
//         </div>
//         <div className="info">
//           <div className="item">
//             {isLoading ? (
//               "loading"
//             ) : data.includes(currentUser.id) ? (
//               <FavoriteOutlinedIcon
//                 style={{ color: "red" }}
//                 onClick={handleLike}
//               />
//             ) : (
//               <FavoriteBorderOutlinedIcon onClick={handleLike} />
//             )}
//             {data?.length} Likes
//           </div>
//           <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
//             <TextsmsOutlinedIcon />
//             See Comments
//           </div>
//           <div className="item">
//             <ShareOutlinedIcon />
//             Share
//           </div>
//         </div>
//         {commentOpen && <Comments postId={post.id} />}
//       </div>
//     </div>
//   );
// };

// export default Post;
