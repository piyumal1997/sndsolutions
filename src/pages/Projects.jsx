// src/pages/Projects.jsx (Sectioned Layout with Hero, Filters, Grid, Pagination - Light Theme)
import { useState, useEffect, useMemo } from 'react';
import ProjectCard from '../components/ui/ProjectCard';
import ProjectModal from '../components/ui/ProjectModal';
import { supabase } from '../supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
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

  // Filter & Search
  useEffect(() => {
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
    setCurrentPage(1);
  }, [search, typeFilter, dateFilter, projects]);

  // Pagination
  const currentProjects = useMemo(() => {
    const firstIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(firstIndex, firstIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <main className="pt-28 bg-white">
      {/* Hero Section */}
      <section className="relative h-70 bg-gradient-to-r from-green-700 to-emerald-700 flex items-center justify-center">
        {/* <div className="absolute inset-0 bg-white/60"></div> */}
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Projects
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-white">
            Explore our completed installations and engineering achievements across Sri Lanka
          </p>
        </div>
      </section>

      {/* Filters & Search Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Find the Perfect Project
          </h2>

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 justify-center items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 transition"
              >
                <option value="all">All Types</option>
                <option value="residential-solar">Residential Solar</option>
                <option value="industrial-solar">Industrial Solar</option>
                <option value="automation">Automation</option>
                <option value="engineering">Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-6 py-3 bg-white border border-gray-300 rounded-lg focus:border-green-600 transition"
              >
                <option value="all">All Dates</option>
                <option value="last-month">Last Month</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-xl text-gray-600">
              No projects match your criteria.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {currentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-8 mt-16">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
                  >
                    Previous
                  </button>
                  <span className="text-lg font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-8 py-4 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Optional CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Interested in a Custom Solution?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Contact us today for a free consultation on your next project.
          </p>
          <a
            href="/contact"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
};

export default Projects;