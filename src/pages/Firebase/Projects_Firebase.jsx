// src/pages/Projects.jsx (Updated – Uses Image URLs from Firestore)
import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import ProjectCard from '../../components/ui/ProjectCard';
import ProjectModal from '../../components/ui/ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsPerPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          images: doc.data().images || [] // Ensure images array
        }));
        setProjects(data);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    return filtered;
  }, [projects, search, typeFilter]);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <section className="pt-32 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12">Our Projects</h1>

        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
          <input type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 px-6 py-3 border rounded-lg" />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-6 py-3 border rounded-lg">
            <option value="all">All Types</option>
            <option value="residential-solar">Residential Solar</option>
            <option value="industrial-solar">Industrial Solar</option>
            <option value="automation">Automation</option>
            <option value="engineering">Engineering</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-12">
            <button onClick={() => setCurrentPage(p => Math.max(p-1,1))} disabled={currentPage===1} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))} disabled={currentPage===totalPages} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">Next</button>
          </div>
        )}

        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </div>
    </section>
  );
};

export default Projects;