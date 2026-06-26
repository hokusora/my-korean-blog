import * as contentful from "contentful";

// Initialize the Contentful Client
const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

// Lấy tất cả bài, kèm include: 2 để load linked Category entry
export const getArticles = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "koreanBlog",
      order: "-sys.createdAt",
      include: 2,
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

// Lấy 1 bài theo slug
export const getArticleBySlug = async (slug) => {
  try {
    const entries = await client.getEntries({
      content_type: "koreanBlog",
      "fields.slug": slug,
      limit: 1,
      include: 2,
    });
    return entries.items[0];
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
};

// Lấy bài theo category slug — dùng cho trang /category/:categorySlug
export const getArticlesByCategory = async (categorySlug) => {
  try {
    const entries = await client.getEntries({
      content_type: "koreanBlog",
      "fields.category.fields.slug": categorySlug,
      order: "-sys.createdAt",
      include: 2,
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return [];
  }
};

// Lấy tất cả categories — dùng để render nav hoặc danh sách
export const getCategories = async () => {
  try {
    const entries = await client.getEntries({
      content_type: "category",
      order: "fields.title",
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
