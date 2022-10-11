const fetchProducts = async (QUERY) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
    const promiseFetch = await fetch(URL);
    const value = await promiseFetch.json();
   return value;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
