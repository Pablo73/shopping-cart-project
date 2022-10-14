const getSavedCartItems = () => {
  const dat = localStorage.getItem('cartItems');
  return dat;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
