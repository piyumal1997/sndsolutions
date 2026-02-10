import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "residential-solar",
    date: "",
    details: "",
  });
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      },
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("date", { ascending: false });
    if (error) alert("Error fetching: " + error.message);
    else setProjects(data || []);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let { error } = isRegistering
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      alert("Auth error: " + err.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const uploadImages = async () => {
    if (!newImages.length) return [];
    const urls = [];
    for (const file of newImages) {
      const { data, error } = await supabase.storage
        .from("projects")
        .upload(`${Date.now()}_${file.name}`, file);
      if (error) throw error;
      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(data.path);
      urls.push(publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const imageUrls = await uploadImages();
      const existingUrls = editingProject?.images || [];
      const payload = {
        ...formData,
        images: [...existingUrls, ...imageUrls],
      };

      if (editingProject) {
        await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id);
      } else {
        await supabase.from("projects").insert(payload);
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      type: "residential-solar",
      date: "",
      details: "",
    });
    setNewImages([]);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      type: project.type,
      date: project.date,
      details: project.details,
    });
    setNewImages([]);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete?")) {
      await supabase.from("projects").delete().eq("id", id);
      fetchProjects();
    }
  };

  const removeImage = async (index) => {
    if (
      !editingProject ||
      !editingProject.images ||
      !Array.isArray(editingProject.images)
    ) {
      alert("No images available or invalid project data.");
      return;
    }

    const url = editingProject.images[index];

    // Safety check: ensure url is a valid string
    if (typeof url !== "string" || !url.trim()) {
      alert("Invalid image at position " + index);
      return;
    }

    // Ask for confirmation
    const confirmed = window.confirm(
      `Are you sure you want to remove this image?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      // User clicked "No" or canceled → do nothing
      return;
    }

    // User clicked "Yes" → proceed with deletion
    try {
      // Extract file path from Supabase public URL
      const filePathMatch = url.match(/\/object\/public\/projects\/(.+)/);
      if (!filePathMatch || !filePathMatch[1]) {
        throw new Error("Could not extract file path from URL");
      }
      const filePath = filePathMatch[1];

      // Delete from Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("projects")
        .remove([filePath]);

      if (storageError) throw storageError;

      // Update images array in state & database
      const updatedImages = editingProject.images.filter((_, i) => i !== index);

      const { error: dbError } = await supabase
        .from("projects")
        .update({ images: updatedImages })
        .eq("id", editingProject.id);

      if (dbError) throw dbError;

      // Refresh full project list
      fetchProjects();

      // Update current editing state
      setEditingProject({ ...editingProject, images: updatedImages });

      alert("Image removed successfully!");
    } catch (err) {
      console.error("Remove image error:", err);
      alert("Failed to remove image: " + (err.message || "Unknown error"));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleAuth}
          className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-4xl font-bold text-center mb-8">
            {isRegistering ? "Register Admin" : "Admin Login"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-6 py-4 border rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-6 py-4 border rounded-lg mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700"
          >
            {" "}
            {isRegistering ? "Register" : "Login"}
          </button>
          <p className="text-center mt-6">
            {isRegistering ? "Have account?" : "No account?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-green-600 hover:underline"
            >
              {" "}
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <p className="text-lg">Logged in: {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {editingProject ? "Edit" : "Add"} Project
          </h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Title *"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="px-6 py-4 border rounded-lg"
            />
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="px-6 py-4 border rounded-lg"
            >
              <option value="residential-solar">Residential Solar</option>
              <option value="industrial-solar">Industrial Solar</option>
              <option value="automation">Automation</option>
              <option value="engineering">Engineering</option>
            </select>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="px-6 py-4 border rounded-lg"
            />
            <textarea
              placeholder="Description *"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows="4"
              className="md:col-span-2 px-6 py-4 border rounded-lg"
            />
            <textarea
              placeholder="Details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              rows="6"
              className="md:col-span-2 px-6 py-4 border rounded-lg"
            />

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-lg font-medium mb-4">
                Upload New Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => setNewImages([...e.target.files])}
                className="w-full px-6 py-4 border rounded-lg"
              />
              {newImages.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {newImages.length} files selected
                </p>
              )}
            </div>

            {/* Existing Images (with Remove) */}
            {editingProject && editingProject.images?.length > 0 && (
              <div className="md:col-span-2">
                <p className="text-lg font-medium mb-4">
                  Current Images ({editingProject.images.length})
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {editingProject.images.map((url, i) => (
                    <div key={i} className="relative">
                      <img
                        src={url}
                        alt="Project"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2 flex gap-6">
              <button
                type="submit"
                disabled={uploading}
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {uploading
                  ? "Uploading..."
                  : editingProject
                    ? "Update Project"
                    : "Add Project"}
              </button>
              {editingProject && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <h2 className="text-3xl font-bold mb-8">
          Existing Projects ({projects.length})
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="text-sm text-gray-500 space-y-1 mb-6">
                <p>Type: {project.type.replace("-", " ").toUpperCase()}</p>
                <p>Date: {project.date}</p>
                <p>Images: {project.images?.length || 0}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
