const BASE_URL = "http://localhost:8080";

// CREATE PRODUCT (seller)
export async function createProduct(categoryId, productData) {
  const response = await fetch(
    `${BASE_URL}/product/admin/products?categoryId=${categoryId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

// GET ALL PRODUCTS (homepage)
export async function getProducts(page = 0, size = 10) {
  const response = await fetch(
    `${BASE_URL}/product/products?page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json(); // expects { items, totalPages }
}

// GET PRODUCT BY ID (product detail page)
export async function getProductById(id) {
  const response = await fetch(
    `http://localhost:8080/product/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

// GET PRODUCTS BY CATEGORY (paginated)
export async function getProductsByCategory(categoryId, page = 0, size = 10) {
  const response = await fetch(
    `http://localhost:8080/product/categories/${categoryId}/products?page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json(); // expects { items, totalPages }
}

// SEARCH PRODUCTS (paginated)
export async function searchProducts(keyword, page = 0, size = 10) {
  const response = await fetch(
    `http://localhost:8080/product/search?keyword=${encodeURIComponent(
      keyword
    )}&page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to search products");
  }

  return response.json(); // expects { items, totalPages }
}
