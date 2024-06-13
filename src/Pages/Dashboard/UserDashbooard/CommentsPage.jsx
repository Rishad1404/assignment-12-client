import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CommentPage = () => {
  const { postTitle } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: comments = [] } = useQuery({
    queryKey: ["post", postTitle],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comment/${postTitle}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Comments for {postTitle}</h1>
      <div className="overflow-x-auto max-w-6xl border-2 rounded-xl">
        <table className="table">
          <thead>
            <tr className="bg-slate-200 text-lg">
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id}>
                <td>{comment.email}</td>
                <td>{comment.text}</td>
                <td>
                  <select
                    value={comment.feedback || ""}
                    className="dropdown"
                    disabled={comment.reported}
                  >
                    <option value="" disabled>
                      Select feedback
                    </option>
                    <option value="spam">Spam</option>
                    <option value="offensive">Offensive</option>
                    <option value="irrelevant">Irrelevant</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-ghost bg-red-600 text-white"
                    disabled={!comment.canReport || comment.reported}
                  >
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentPage;
