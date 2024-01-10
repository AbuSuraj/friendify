import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import { makeRequest } from "../../axios.js";

const Comments = ({ postId }) => {
  console.log(postId);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: (newComment) => {
        return makeRequest.post("/comments", newComment);
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleDelete = async (commentId) => {
    console.log(commentId);
    try {
      await makeRequest.delete(`/comments/${commentId}`);
      // Invalidate and refetch
      queryClient.invalidateQueries(["comments"]);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e?.target?.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.name}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
              <button onClick={() => handleDelete(comment.id)}>delete</button>
            </div>
          ))}
    </div>
  );
};

export default Comments;

// import { useContext, useState } from "react";
// import "./comments.scss";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import moment from "moment";

// import { makeRequest } from "../../axios.js";

// const Comments = ({ postId }) => {
//   const [desc, setDesc] = useState("");
//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["comments", postId], // Include postId in the queryKey
//     queryFn: () =>
//       makeRequest.get("/comments?postId=" + postId).then((res) => {
//         return res.data;
//       }),
//   });

//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     {
//       mutationFn: (newComment) => {
//         return makeRequest.post("/comments", newComment);
//       },
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["comments", postId]); // Update query key to include postId
//       },
//     }
//   );

//   const handleClick = async (e) => {
//     e.preventDefault();
//     mutation.mutate({ desc, postId });
//     setDesc("");
//   };

//   const handleDelete = async (commentId) => {
//     try {
//       await makeRequest.delete(`/comments/${commentId}`);
//       queryClient.invalidateQueries(["comments", postId]);
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

//   return (
//     <div className="comments">
//       <div className="write">
//         <img src={currentUser.profilePic} alt="" />
//         <input
//           type="text"
//           placeholder="write a comment"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />
//         <button onClick={handleClick}>Send</button>
//       </div>
//       {error ? (
//         "Something went wrong"
//       ) : isLoading ? (
//         "loading"
//       ) : (
//         data.map((comment) => (
//           <div className="comment" key={comment.id}>
//             <img src={"/upload/" + comment.profilePic} alt="" />
//             <div className="info">
//               <span>{comment.name}</span>
//               <p>{comment.desc}</p>
//             </div>
//             <span className="date">{moment(comment.createdAt).fromNow()}</span>
//             <button onClick={() => handleDelete(comment.id)}>delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Comments;

// import { useContext, useState } from "react";
// import "./comments.scss";
// import { AuthContext } from "../../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import moment from "moment";

// import { makeRequest } from "../../axios.js"
// const Comments = ({postId}) => {
//   const [desc, setDesc] = useState("");
//   const { currentUser } = useContext(AuthContext);

//   const { isLoading, error, data } = useQuery({
//     queryKey: ["comments"],
//     queryFn: () =>
//       makeRequest.get("/comments?postId=" + postId).then((res) => {
//         return res.data;
//       }),
//   });
  

//   const queryClient = useQueryClient();

//   const mutation = useMutation(
//     {mutationFn: (newComment) => {
//       return makeRequest.post("/comments", newComment);
//     },
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries(["comments"]);
//       },
//     }
//   );

//   const handleClick = async (e) => {
//     e.preventDefault();
//     mutation.mutate({ desc, postId });
//     setDesc("");
//   };

  
//   return (
//     <div className="comments">
//       <div className="write">
//         <img src={currentUser.profilePic} alt="" />
//         <input
//           type="text"
//           placeholder="write a comment"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />
//         <button onClick={handleClick}>Send</button>
//       </div>
//       {error
//         ? "Something went wrong"
//         : isLoading
//         ? "loading"
//         : data.map((comment) => (
//             <div className="comment">
//               <img src={"/upload/" + comment.profilePic} alt="" />
//               <div className="info">
//                 <span>{comment.name}</span>
//                 <p>{comment.desc}</p>
//               </div>
//               <span className="date">
//                 {moment(comment.createdAt).fromNow()}
//               </span>
//               <button>delete</button>
//             </div>
//           ))}
//     </div>
//   );
// };

// export default Comments;
