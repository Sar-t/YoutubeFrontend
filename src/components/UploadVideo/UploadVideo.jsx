import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth); // get user + token
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert("Please select a video file!");
      return;
    }

    const formData = new FormData(); // Create a new FormData object
    formData.append("videoFile", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    try {
        setLoading(true);
        const response = await fetch("/api/v1/video/upload", {
            method: "POST",
            headers: {
            // attach token if backend requires auth
            Authorization: `Bearer ${auth.user?.accessToken}`
            },
            body: formData
        });

        const result = await response.json();
        console.log("Upload result:", result);

        if (response.ok) {
            alert("Video uploaded successfully!");
            navigate("/"); // go back to homepage
        } else {
            alert(result.message || "Upload failed!");
        }
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Something went wrong!");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a Video</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label for="video">Select Video</label>
        <input
          placeholder="Select video"
          id = "video"
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
          required
        />
        <label for="thumbnail">Select Thumbnail</label>
        <input
            placeholder="Select thumbnail"
            id = "thumbnail"
            type = "file"
            accept = "image/*"
            onChange = {(e) => setThumbnail(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
