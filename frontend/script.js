// Handle upload
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const res = await fetch('https://media-archive-app-1.onrender.com/api/media/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (data.success) {
    alert('Upload success!');
    e.target.reset();
    document.getElementById('uploadSection').classList.add('hidden');
  } else {
    alert('Upload failed.');
  }
});

// Show upload form
function showUploadForm() {
  document.getElementById('uploadSection').classList.remove('hidden');
  document.getElementById('uploadSection').scrollIntoView({ behavior: "smooth" });
}

// Toggle filter dropdown
function toggleFilter() {
  const filter = document.getElementById('filterOptions');
  filter.classList.toggle('hidden');
}

// Search
async function searchMedia() {
  const query = document.getElementById('searchQuery').value;
  const type = document.getElementById('mediaTypeFilter').value;

  const url = new URL('https://media-archive-app-1.onrender.com/api/media/search');
  if (query) url.searchParams.append('query', query);
  if (type) url.searchParams.append('type', type);

  const res = await fetch(url);
  const data = await res.json();

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (data.length === 0) {
    resultsDiv.innerHTML = '<p>No media found.</p>';
    return;
  }

  data.forEach(media => {
    const item = document.createElement('div');
    item.innerHTML = `
      <h3>${media.title} (${media.type})</h3>
      <p>${media.description}</p>
      <a href="https://media-archive-app-1.onrender.com/${media.fileUrl}" target="_blank">View File</a>
    `;
    resultsDiv.appendChild(item);
  });
}
// ...existing code...

// View all archive data
async function viewArchive() {
  try {
    const res = await fetch('https://media-archive-app-1.onrender.com/api/media/all');
    const data = await res.json();
    
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (data.length === 0) {
      resultsDiv.innerHTML = '<div class="no-results"><h3>No media files found in archive</h3></div>';
      return;
    }
    
    // Add archive header
    resultsDiv.innerHTML = `<div class="archive-header"><h2>Media Archive (${data.length} files)</h2></div>`;
    
    data.forEach(media => {
      const div = document.createElement('div');
      div.className = 'media-item';
      div.innerHTML = `
        <h3>${media.title}</h3>
        <p><strong>Description:</strong> ${media.description}</p>
        <p><strong>Type:</strong> ${media.type}</p>
        <p><strong>Uploaded:</strong> ${new Date(media.createdAt).toLocaleDateString()}</p>
        ${media.filename ? `<p><strong>File:</strong> ${media.filename}</p>` : ''}
      `;
      resultsDiv.appendChild(div);
    });
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    console.error('Archive error:', error);
    document.getElementById('results').innerHTML = '<div class="error">Error loading archive data</div>';
  }
}
