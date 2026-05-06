import { getContent } from "@/lib/data-service";
import { 
  handleUpdateHero, 
  handleUpdateAbout, 
  handleUpdateServices, 
  handleUpdateWhyUs, 
  handleUpdateResults, 
  handleUpdateTestimonials, 
  handleUpdateCta, 
  handleUpdateContact,
  handleUpdateFooter,
  handleAddBlog, 
  handleDeleteBlog 
} from "@/lib/actions";

export default async function AdminPage() {
  const data = await getContent();
  const { hero, about, services, whyUs, results, testimonials, cta, contact, footer, blogs } = data;

  return (
    <main className="admin-panel" style={{ background: '#050505', minHeight: '100vh', color: '#fff', padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ marginBottom: '50px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: '800' }}>Explonexa Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Simplified Content Editor — No JSON, just boxes.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
          
          <aside style={{ position: 'sticky', top: '40px', height: 'fit-content' }}>
            <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Hero', 'About', 'Services', 'Why Us', 'Results', 'Testimonials', 'CTA', 'Contact', 'Footer', 'Blogs'].map(item => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="nav-item">{item}</a>
                ))}
              </nav>
            </div>
          </aside>

          <div style={{ display: 'grid', gap: '60px' }}>
            
            {/* HERO */}
            <section id="hero">
              <div className="section-header-admin"><h2>Hero Section</h2></div>
              <form action={handleUpdateHero} className="admin-form">
                <div className="grid-2">
                  <div className="form-group"><label>Badge</label><input name="badge" defaultValue={hero.badge} /></div>
                  <div className="form-group"><label>Title Line 1</label><input name="titleLine1" defaultValue={hero.titleLine1} /></div>
                </div>
                <div className="grid-2">
                  <div className="form-group"><label>Title Line 2 (Gradient)</label><input name="titleLine2" defaultValue={hero.titleLine2} /></div>
                  <div className="form-group"><label>Subtitle</label><textarea name="subtitle" defaultValue={hero.subtitle} rows={2} /></div>
                </div>
                <div className="grid-2">
                  <div className="form-group"><label>Primary Button</label><input name="primaryBtnText" defaultValue={hero.primaryBtnText} /></div>
                  <div className="form-group"><label>Secondary Button</label><input name="secondaryBtnText" defaultValue={hero.secondaryBtnText} /></div>
                </div>
                <button type="submit" className="admin-btn">Save Hero</button>
              </form>
            </section>

            {/* ABOUT */}
            <section id="about">
              <div className="section-header-admin"><h2>About Section</h2></div>
              <form action={handleUpdateAbout} className="admin-form">
                <div className="grid-2">
                  <div className="form-group"><label>Badge</label><input name="badge" defaultValue={about.badge} /></div>
                  <div className="form-group"><label>Title</label><input name="title" defaultValue={about.title} /></div>
                </div>
                <div className="form-group"><label>Description 1</label><textarea name="description1" defaultValue={about.description1} rows={2} /></div>
                <div className="form-group"><label>Description 2</label><textarea name="description2" defaultValue={about.description2} rows={2} /></div>
                
                <h3 className="sub-title">Core Features</h3>
                <div className="grid-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="box-item">
                      <input name={`feature${i}_title`} placeholder={`Feature ${i} Title`} defaultValue={about.features[i-1]?.title} />
                      <textarea name={`feature${i}_desc`} placeholder="Short description..." defaultValue={about.features[i-1]?.desc} rows={2} />
                    </div>
                  ))}
                </div>

                <h3 className="sub-title">Impact Metrics</h3>
                <div className="grid-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="box-item">
                      <input name={`metric${i}_label`} placeholder="Label (e.g. Clients)" defaultValue={about.metrics[i-1]?.label} />
                      <input name={`metric${i}_value`} placeholder="Value (e.g. 500)" defaultValue={about.metrics[i-1]?.value} />
                    </div>
                  ))}
                </div>
                <button type="submit" className="admin-btn">Save About</button>
              </form>
            </section>

            {/* SERVICES */}
            <section id="services">
              <div className="section-header-admin"><h2>Services Section</h2></div>
              <form action={handleUpdateServices} className="admin-form">
                <div className="grid-2">
                  <div className="form-group"><label>Badge</label><input name="badge" defaultValue={services.badge} /></div>
                  <div className="form-group"><label>Title</label><input name="title" defaultValue={services.title} /></div>
                </div>
                <div className="form-group"><label>Subtitle</label><textarea name="subtitle" defaultValue={services.subtitle} rows={2} /></div>
                
                <h3 className="sub-title">Services (3 Boxes)</h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="box-item full">
                      <div className="grid-2">
                        <input name={`service${i}_title`} placeholder="Service Title" defaultValue={services.list[i-1]?.title} />
                        <input name={`service${i}_features`} placeholder="Features (comma separated: SEO, Ads, Copy)" defaultValue={services.list[i-1]?.features.join(', ')} />
                      </div>
                      <textarea name={`service${i}_desc`} placeholder="Service description..." defaultValue={services.list[i-1]?.desc} rows={2} />
                    </div>
                  ))}
                </div>
                <button type="submit" className="admin-btn">Save Services</button>
              </form>
            </section>

            {/* WHY US */}
            <section id="whyus">
              <div className="section-header-admin"><h2>Why Choose Us</h2></div>
              <form action={handleUpdateWhyUs} className="admin-form">
                <div className="grid-2">
                  <div className="form-group"><label>Badge</label><input name="badge" defaultValue={whyUs.badge} /></div>
                  <div className="form-group"><label>Title</label><input name="title" defaultValue={whyUs.title} /></div>
                </div>
                <div className="form-group"><label>Subtitle</label><textarea name="subtitle" defaultValue={whyUs.subtitle} rows={2} /></div>
                
                <h3 className="sub-title">Value Props (4 Boxes)</h3>
                <div className="grid-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="box-item">
                      <input name={`why${i}_title`} placeholder="Benefit Title" defaultValue={whyUs.list[i-1]?.title} />
                      <textarea name={`why${i}_desc`} placeholder="Benefit detail..." defaultValue={whyUs.list[i-1]?.desc} rows={2} />
                    </div>
                  ))}
                </div>
                <button type="submit" className="admin-btn">Save Why Us</button>
              </form>
            </section>

            {/* RESULTS */}
            <section id="results">
              <div className="section-header-admin"><h2>Results & Stats</h2></div>
              <form action={handleUpdateResults} className="admin-form">
                <div className="grid-2">
                  <div className="form-group"><label>Badge</label><input name="badge" defaultValue={results.badge} /></div>
                  <div className="form-group"><label>Title</label><input name="title" defaultValue={results.title} /></div>
                </div>
                
                <h3 className="sub-title">Case Study Boxes (3 Boxes)</h3>
                <div className="grid-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="box-item">
                      <input name={`result${i}_val`} placeholder="Value (e.g. 340%)" defaultValue={results.list[i-1]?.val} />
                      <input name={`result${i}_label`} placeholder="Label" defaultValue={results.list[i-1]?.label} />
                      <input name={`result${i}_tag`} placeholder="Tag (e.g. E-Commerce)" defaultValue={results.list[i-1]?.tag} />
                      <textarea name={`result${i}_desc`} placeholder="Context..." defaultValue={results.list[i-1]?.desc} rows={2} />
                    </div>
                  ))}
                </div>
                <button type="submit" className="admin-btn">Save Results</button>
              </form>
            </section>

            {/* TESTIMONIALS */}
            <section id="testimonials">
              <div className="section-header-admin"><h2>Client Testimonials</h2></div>
              <form action={handleUpdateTestimonials} className="admin-form">
                <div className="grid-2">
                  <div className="form-group"><label>Badge</label><input name="badge" defaultValue={testimonials.badge} /></div>
                  <div className="form-group"><label>Title</label><input name="title" defaultValue={testimonials.title} /></div>
                </div>
                
                <h3 className="sub-title">Review Boxes (3 Boxes)</h3>
                <div style={{ display: 'grid', gap: '20px' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="box-item full">
                      <div className="grid-3">
                        <input name={`testimonial${i}_author`} placeholder="Client Name" defaultValue={testimonials.list[i-1]?.author} />
                        <input name={`testimonial${i}_role`} placeholder="Role/Company" defaultValue={testimonials.list[i-1]?.role} />
                        <input name={`testimonial${i}_initial`} placeholder="Initial (e.g. SK)" defaultValue={testimonials.list[i-1]?.initial} />
                      </div>
                      <textarea name={`testimonial${i}_text`} placeholder="Their feedback..." defaultValue={testimonials.list[i-1]?.text} rows={2} />
                    </div>
                  ))}
                </div>
                <button type="submit" className="admin-btn">Save Testimonials</button>
              </form>
            </section>

            {/* CONTACT */}
            <section id="contact">
              <div className="section-header-admin"><h2>Contact Details</h2></div>
              <form action={handleUpdateContact} className="admin-form">
                <div className="grid-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="box-item">
                      <input name={`contact${i}_title`} placeholder="Title (e.g. Email Us)" defaultValue={contact.details[i-1]?.title} />
                      <input name={`contact${i}_val`} placeholder="Value (e.g. hello@...)" defaultValue={contact.details[i-1]?.val} />
                      <select name={`contact${i}_type`} defaultValue={contact.details[i-1]?.type} style={{ background: '#000', color: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
                        <option value="email">Email</option>
                        <option value="address">Address</option>
                        <option value="phone">Phone</option>
                      </select>
                    </div>
                  ))}
                </div>
                <button type="submit" className="admin-btn">Save Contact</button>
              </form>
            </section>

            {/* FOOTER */}
            <section id="footer">
              <div className="section-header-admin"><h2>Footer & Social</h2></div>
              <form action={handleUpdateFooter} className="admin-form">
                <div className="form-group"><label>Footer Description</label><textarea name="description" defaultValue={footer.description} rows={2} /></div>
                <div className="grid-3">
                  <div className="form-group"><label>Twitter</label><input name="twitter" defaultValue={footer.socialLinks.twitter} /></div>
                  <div className="form-group"><label>LinkedIn</label><input name="linkedin" defaultValue={footer.socialLinks.linkedin} /></div>
                  <div className="form-group"><label>Instagram</label><input name="instagram" defaultValue={footer.socialLinks.instagram} /></div>
                </div>
                <button type="submit" className="admin-btn">Save Footer</button>
              </form>
            </section>

            {/* BLOGS */}
            <section id="blogs">
              <div className="section-header-admin"><h2>Blog Manager</h2></div>
              <div className="glass-card" style={{ padding: '30px', marginBottom: '30px' }}>
                <form action={handleAddBlog} className="admin-form">
                  <div className="form-group">
                    <label>Post Title</label>
                    <input name="title" placeholder="e.g. 5 Growth Hacks for 2026" required />
                  </div>
                  <div className="grid-2">
                    <div className="form-group"><label>Category</label><input name="category" placeholder="Marketing, SEO, etc." /></div>
                    <div className="form-group"><label>Author</label><input name="author" placeholder="Your Name" /></div>
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input name="image" placeholder="https://unsplash.com/..." />
                  </div>
                  <div className="form-group">
                    <label>Short Excerpt</label>
                    <textarea name="excerpt" placeholder="Brief summary of the article..." rows={2} />
                  </div>
                  <div className="form-group">
                    <label>Main Content (HTML Supported)</label>
                    <textarea name="content" placeholder="Write your article content here..." rows={8} />
                  </div>
                  <button type="submit" className="admin-btn">Publish Article</button>
                </form>
              </div>
              <div className="blogs-list">
                {blogs.map(blog => (
                  <div key={blog.id} className="blog-item-admin">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={blog.image} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: '600' }}>{blog.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{blog.category} • {blog.date}</div>
                      </div>
                    </div>
                    <form action={handleDeleteBlog.bind(null, blog.id)}><button type="submit" className="del-btn">Remove</button></form>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      <style>{`
        .nav-item { padding: 12px 16px; border-radius: 10px; color: rgba(255,255,255,0.6); text-decoration: none; transition: 0.3s; font-size: 0.95rem; }
        .nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .section-header-admin { margin-bottom: 25px; border-left: 4px solid #3b82f6; padding-left: 15px; }
        .sub-title { font-size: 1.1rem; margin: 20px 0 15px; color: #3b82f6; font-weight: 600; }
        .admin-form { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; display: grid; gap: 20px; }
        .form-group label { display: block; margin-bottom: 8px; color: rgba(255,255,255,0.4); font-size: 0.85rem; }
        .admin-form input, .admin-form textarea, .box-item input, .box-item textarea { 
            width: 100%; 
            padding: 12px 16px; 
            background: #000000 !important; 
            border: 1px solid rgba(255,255,255,0.1) !important; 
            border-radius: 10px; 
            color: #ffffff !important; 
            font-size: 0.95rem; 
            outline: none;
            box-shadow: none;
            appearance: none;
        }
        .admin-form input:focus, .admin-form textarea:focus, .box-item input:focus, .box-item textarea:focus {
            border-color: #3b82f6 !important;
            background: #000000 !important;
        }
        ::placeholder { color: rgba(255,255,255,0.3); }
        .box-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); padding: 15px; border-radius: 12px; display: grid; gap: 10px; }
        .box-item.full { grid-column: span 2; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .admin-btn { width: fit-content; padding: 12px 24px; background: #3b82f6; color: #fff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: 0.3s; }
        .admin-btn:hover { background: #2563eb; transform: scale(1.02); }
        .blog-item-admin { display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: rgba(255,255,255,0.02); border-radius: 10px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .del-btn { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); padding: 5px 12px; border-radius: 6px; cursor: pointer; }
      `}</style>
    </main>
  );
}
