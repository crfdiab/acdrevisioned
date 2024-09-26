import { MetadataRoute } from 'next'
import { getAllBlogs } from '@/lib/markdown'
import { page_routes } from '@/lib/routes-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://acdrevisioned.vercel.app'

  const blogs = await getAllBlogs()

  const aiToolUrls = page_routes.map((route) => ({
    url: `${baseUrl}/docs${route.href}`,
    lastModified: new Date().toISOString(),
  }))

  const blogUrls = blogs.map((blog) => {
    const date = new Date(blog.frontmatter.date)
    return {
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(),
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
    },
    ...aiToolUrls,
    ...blogUrls,
  ]
}