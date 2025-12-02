export const searchMovies = async (title: string) => {
  if (!title || title.trim() === "") return [];

  const encoded = encodeURIComponent(title.trim());

  const response = await fetch(
    `http://localhost:3001/movies?title=${encoded}`,
    { method: "GET" }
  );

  if (!response.ok) {
    console.error("Error en la búsqueda:", response.status);
    return [];
  }

  return response.json();
};
