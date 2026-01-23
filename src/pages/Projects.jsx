// src/pages/Projects.jsx (Updated & Complete with Filters, Pagination, Search, and Dynamic Images)
import { useState, useEffect, useMemo } from 'react';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectModal from '../components/ui/ProjectModal';
import { supabase } from '../supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // New: Date filter (e.g., last month, year)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const projectsPerPage = 6;

  // Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('date', { ascending: false });
      if (error) console.error('Error fetching projects:', error);
      else setProjects(data || []);
    };
    fetchProjects();
  }, []);

  // Filter & Search (useMemo to optimize)
  useEffect(() => {
    let filtered = projects;

    // Search by title/description
    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Date filter (e.g., 'last-month', 'last-year', etc.)
    if (dateFilter !== 'all') {
      const now = new Date();
      let cutoffDate;
      if (dateFilter === 'last-month') {
        cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
      } else if (dateFilter === 'last-year') {
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
      } else if (dateFilter === 'last-6-months') {
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
      }
      filtered = filtered.filter(p => new Date(p.date) >= cutoffDate);
    }

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to page 1 on filter change
  }, [search, typeFilter, dateFilter, projects]);

  // Pagination slice
  const currentProjects = useMemo(() => {
    const firstIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(firstIndex, firstIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <section className="pt-32 py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-green-900">Our Projects</h1>

        {/* Filters & Search */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:border-green-500 transition"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-6 py-3 border border-gray-300 rounded-lg focus:border-green-500 transition"
          >
            <option value="all">All Types</option>
            <option value="residential-solar">Residential Solar</option>
            <option value="industrial-solar">Industrial Solar</option>
            <option value="automation">Automation</option>
            <option value="engineering">Engineering</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-6 py-3 border border-gray-300 rounded-lg focus:border-green-500 transition"
          >
            <option value="all">All Dates</option>
            <option value="last-month">Last Month</option>
            <option value="last-6-months">Last 6 Months</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
          {filteredProjects.length === 0 && (
            <p className="text-center text-gray-600 col-span-full">No projects match your criteria.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50 hover:bg-green-700 transition"
            >
              Previous
            </button>
            <span className="py-3 text-lg">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-green-600 text-white rounded-lg disabled:opacity-50 hover:bg-green-700 transition"
            >
              Next
            </button>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </section>
  );
};

export default Projects;