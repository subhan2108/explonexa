"use server";

import { revalidatePath } from 'next/cache';
import { updateSection, addBlog, deleteBlog } from './data-service';

export async function handleUpdateHero(formData: FormData) {
  const data = {
    badge: formData.get('badge') as string,
    titleLine1: formData.get('titleLine1') as string,
    titleLine2: formData.get('titleLine2') as string,
    subtitle: formData.get('subtitle') as string,
    primaryBtnText: formData.get('primaryBtnText') as string,
    secondaryBtnText: formData.get('secondaryBtnText') as string,
  };
  await updateSection('hero', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateAbout(formData: FormData) {
  const features = [];
  for (let i = 1; i <= 4; i++) {
    const title = formData.get(`feature${i}_title`) as string;
    const desc = formData.get(`feature${i}_desc`) as string;
    if (title) features.push({ title, desc });
  }

  const metrics = [];
  for (let i = 1; i <= 4; i++) {
    const label = formData.get(`metric${i}_label`) as string;
    const value = formData.get(`metric${i}_value`) as string;
    if (label) metrics.push({ label, value });
  }

  const data = {
    badge: formData.get('badge') as string,
    title: formData.get('title') as string,
    description1: formData.get('description1') as string,
    description2: formData.get('description2') as string,
    features,
    metrics,
  };
  await updateSection('about', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateServices(formData: FormData) {
  const list = [];
  for (let i = 1; i <= 3; i++) {
    const title = formData.get(`service${i}_title`) as string;
    const desc = formData.get(`service${i}_desc`) as string;
    const featuresRaw = formData.get(`service${i}_features`) as string;
    if (title) {
      list.push({ 
        title, 
        desc, 
        features: featuresRaw ? featuresRaw.split(',').map(f => f.trim()) : [] 
      });
    }
  }

  const data = {
    badge: formData.get('badge') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    list,
  };
  await updateSection('services', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateWhyUs(formData: FormData) {
  const list = [];
  for (let i = 1; i <= 4; i++) {
    const title = formData.get(`why${i}_title`) as string;
    const desc = formData.get(`why${i}_desc`) as string;
    if (title) list.push({ title, desc });
  }

  const data = {
    badge: formData.get('badge') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    list,
  };
  await updateSection('whyUs', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateResults(formData: FormData) {
  const list = [];
  for (let i = 1; i <= 3; i++) {
    const val = formData.get(`result${i}_val`) as string;
    const label = formData.get(`result${i}_label`) as string;
    const desc = formData.get(`result${i}_desc`) as string;
    const tag = formData.get(`result${i}_tag`) as string;
    if (val) list.push({ val, label, desc, tag });
  }

  const data = {
    badge: formData.get('badge') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    list,
  };
  await updateSection('results', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateTestimonials(formData: FormData) {
  const list = [];
  for (let i = 1; i <= 3; i++) {
    const text = formData.get(`testimonial${i}_text`) as string;
    const author = formData.get(`testimonial${i}_author`) as string;
    const role = formData.get(`testimonial${i}_role`) as string;
    const initial = formData.get(`testimonial${i}_initial`) as string;
    if (text) list.push({ text, author, role, initial });
  }

  const data = {
    badge: formData.get('badge') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    list,
  };
  await updateSection('testimonials', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateCta(formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    primaryBtn: formData.get('primaryBtn') as string,
    secondaryBtn: formData.get('secondaryBtn') as string,
  };
  await updateSection('cta', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateContact(formData: FormData) {
  const details = [];
  for (let i = 1; i <= 3; i++) {
    const title = formData.get(`contact${i}_title`) as string;
    const val = formData.get(`contact${i}_val`) as string;
    const type = formData.get(`contact${i}_type`) as string;
    if (title) details.push({ title, val, type });
  }

  const data = {
    badge: formData.get('badge') as string,
    title: formData.get('title') as string,
    subtitle: formData.get('subtitle') as string,
    details,
  };
  await updateSection('contact', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleUpdateFooter(formData: FormData) {
  const data = {
    description: formData.get('description') as string,
    socialLinks: {
      twitter: formData.get('twitter') as string,
      linkedin: formData.get('linkedin') as string,
      instagram: formData.get('instagram') as string,
    },
  };
  await updateSection('footer', data);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function handleAddBlog(formData: FormData) {
  const blog = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    image: (formData.get('image') as string) || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    author: formData.get('author') as string || "Admin",
    category: formData.get('category') as string || "General",
  };
  await addBlog(blog);
  revalidatePath('/blog');
  revalidatePath('/admin');
}

export async function handleDeleteBlog(id: string) {
  await deleteBlog(id);
  revalidatePath('/blog');
  revalidatePath('/admin');
}
