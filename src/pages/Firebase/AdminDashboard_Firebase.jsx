// src/pages/AdminDashboard.jsx (Full Updated with Image Upload to Firebase Storage)
import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'residential-solar',
    date: '',
    details: '',
    images: [] // Existing images URLs (for edit)
  });
  const [newImages, setNewImages] = useState([]); // New files to upload
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) fetchProjects();
    });
    return unsubscribe;
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) {
      alert('Error fetching projects: ' + err.message);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert('Authentication error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Upload images and return URLs
  const uploadImages = async (files) => {
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrls = editingProject?.images || [];

      if (newImages.length > 0) {
        const uploadedUrls = await uploadImages(newImages);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        date: formData.date || new Date().toISOString().split('T')[0],
        details: formData.details,
        images: imageUrls
      };

      if (editingProject) {
        await updateDoc(doc(db, 'projects', editingProject.id), projectData);
      } else {
        await addDoc(collection(db, 'projects'), projectData);
      }

      fetchProjects();
      resetForm();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      type: 'residential-solar',
      date: '',
      details: '',
      images: []
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
      images: project.images || []
    });
    setNewImages([]);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Permanently delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (err) {
        alert('Error deleting: ' + err.message);
      }
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-8">{isRegistering ? 'Create Admin' : 'Admin Login'}</h2>
          <form onSubmit={handleAuth} className="space-y-6">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-6 py-4 border rounded-lg" />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-6 py-4 border rounded-lg" />
            <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <p className="text-center mt-6">
            {isRegistering ? 'Have account?' : "No account?"}{' '}
            <button onClick={() => setIsRegistering(!isRegistering)} className="text-green-600 hover:underline">
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-6">
            <p className="text-lg">Logged in: {user.email}</p>
            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">Logout</button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
          <h2 className="text-3xl font-bold mb-8">{editingProject ? 'Edit' : 'Add'} Project</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Title *" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="px-6 py-4 border rounded-lg" />
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="px-6 py-4 border rounded-lg">
              <option value="residential-solar">Residential Solar</option>
              <option value="industrial-solar">Industrial Solar</option>
              <option value="automation">Automation</option>
              <option value="engineering">Engineering</option>
            </select>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="px-6 py-4 border rounded-lg" />
            <textarea placeholder="Description *" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows="4" className="md:col-span-2 px-6 py-4 border rounded-lg" />
            <textarea placeholder="Details" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} rows="6" className="md:col-span-2 px-6 py-4 border rounded-lg" />
            
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-lg font-medium mb-4">Upload New Images</label>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={(e) => setNewImages(Array.from(e.target.files))}
                className="w-full px-6 py-4 border rounded-lg"
              />
              {newImages.length > 0 && <p className="mt-2 text-sm text-gray-600">{newImages.length} files selected</p>}
            </div>

            {/* Existing Images (for edit) */}
            {formData.images.length > 0 && (
              <div className="md:col-span-2">
                <p className="text-lg font-medium mb-4">Current Images</p>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((url, i) => (
                    <div key={i} className="relative">
                      <img src={url} alt="Project" className="w-full h-32 object-cover rounded-lg" />
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
              <button type="submit" disabled={uploading} className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 disabled:opacity-50">
                {uploading ? 'Uploading...' : editingProject ? 'Update' : 'Add'}
              </button>
              {editingProject && <button type="button" onClick={resetForm} className="bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700">Cancel</button>}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <h2 className="text-3xl font-bold mb-8">Existing Projects ({projects.length})</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              <p className="text-sm text-gray-500 mb-2">Type: {project.type.replace('-', ' ').toUpperCase()}</p>
              <p className="text-sm text-gray-500 mb-4">Images: {project.images?.length || 0}</p>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(project)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(project.id)} className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;