document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('blog-container');
  const search = document.getElementById('searchInput');
  const catWrap = document.getElementById('categoryFilters');
  let blogs = JSON.parse(localStorage.getItem('blogs')||'[]');
  function renderCategories(){ const cats = ['All', ...new Set(blogs.map(b=>b.category||'General'))]; catWrap.innerHTML = cats.map(c=>`<button onclick="filterCat('${c}')">${c}</button>`).join(''); catWrap.querySelector('button').classList.add('active'); }
  function render(filterText='', category='All'){ container.innerHTML=''; const filtered = blogs.filter(b=> (category==='All' || (b.category||'General')===category) && (b.title.toLowerCase().includes(filterText.toLowerCase())||b.content.toLowerCase().includes(filterText.toLowerCase())) ); if(filtered.length===0){ container.innerHTML='<p style="text-align:center">No blogs found</p>'; return; } filtered.forEach(b=>{ const card = document.createElement('div'); card.className='blog-card'; card.innerHTML = `<img src="${b.image}"><div class="body"><h3>${b.title}</h3><p>${b.short||b.content.substring(0,160)+'...'}</p><button onclick="viewBlog(${b.id})">Read More</button></div>`; container.appendChild(card); }); }
  renderCategories(); render();
  search.addEventListener('input', (e)=> render(e.target.value) );
  window.filterCat = function(cat){ Array.from(catWrap.children).forEach(btn=>btn.classList.remove('active')); [...catWrap.children].find(b=>b.innerText===cat).classList.add('active'); render(search.value, cat); };
  window.viewBlog = function(id){ localStorage.setItem('selectedBlogId', id); window.location.href='blog.html'; };
});