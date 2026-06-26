import * as contentful from "contentful";

// Initialize the Contentful Client
const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const getArticles = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "koreanBlog", // SỬA CHỖ NÀY THÀNH koreanBlog NÈ BỒ
      order: "-sys.createdAt",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const getArticleBySlug = async (slug) => {
  try {
    const entries = await client.getEntries({
      content_type: "koreanBlog", // Chỗ này bồ sửa đúng rồi
      "fields.slug": slug,
      limit: 1,
    });
    return entries.items[0];
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
};
