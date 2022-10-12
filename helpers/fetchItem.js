const fetchItem = async (ItemID) => {
  try {
    const URL = `https://api.mercadolibre.com/items/${ItemID}`;
    const promiseFetch = await fetch(URL);
    const value = await promiseFetch.json();
   return value;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
