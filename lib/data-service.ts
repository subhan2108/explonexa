import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'content.json');

export interface HeroData {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

export interface AboutData {
  badge: string;
  title: string;
  description1: string;
  description2: string;
  features: { title: string; desc: string }[];
  metrics: { label: string; value: string }[];
}

export interface ServicesData {
  badge: string;
  title: string;
  subtitle: string;
  list: { title: string; desc: string; features: string[] }[];
}

export interface WhyUsData {
  badge: string;
  title: string;
  subtitle: string;
  list: { title: string; desc: string }[];
}

export interface ResultsData {
  badge: string;
  title: string;
  subtitle: string;
  list: { val: string; label: string; desc: string; tag: string }[];
}

export interface TestimonialsData {
  badge: string;
  title: string;
  subtitle: string;
  list: { text: string; author: string; role: string; initial: string }[];
}

export interface CtaData {
  title: string;
  subtitle: string;
  primaryBtn: string;
  secondaryBtn: string;
}

export interface ContactData {
  badge: string;
  title: string;
  subtitle: string;
  details: { title: string; val: string; type: string }[];
}

export interface FooterData {
  description: string;
  socialLinks: { twitter: string; linkedin: string; instagram: string };
}

export interface BlogEntry {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface SiteContent {
  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  whyUs: WhyUsData;
  results: ResultsData;
  testimonials: TestimonialsData;
  cta: CtaData;
  contact: ContactData;
  footer: FooterData;
  blogs: BlogEntry[];
}

export async function getContent(): Promise<SiteContent> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading content:', error);
    throw error;
  }
}

export async function updateSection<T extends keyof SiteContent>(section: T, data: SiteContent[T]) {
  const content = await getContent();
  content[section] = data;
  await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2));
}

export async function addBlog(blog: Omit<BlogEntry, 'id' | 'date' | 'slug'>) {
  const content = await getContent();
  const newBlog: BlogEntry = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    slug: blog.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  };
  content.blogs.unshift(newBlog);
  await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2));
}

export async function deleteBlog(id: string) {
  const content = await getContent();
  content.blogs = content.blogs.filter(b => b.id !== id);
  await fs.writeFile(DATA_PATH, JSON.stringify(content, null, 2));
}
