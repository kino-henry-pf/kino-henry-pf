const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const searchMovies = async (title: string) => {
  if (!title || title.trim() === "") return [];

  const encoded = encodeURIComponent(title.trim());

  const response = await fetch(
    `${API_URL}/movies?title=${encoded}`,
    { method: "GET" }
  );

  if (!response.ok) {
    console.error("Error en la búsqueda:", response.status);
    return [];
  }

  return response.json();
};
