const API = {
  url: "https://www.themealdb.com/api/json/v1/",
  key: import.meta.env.VITE_API_KEY,
  query: {
    random: "/random.php",
    byLetter: "/search.php?f=",
    byId: "/lookup.php?i=",
  },
};

export default API;
