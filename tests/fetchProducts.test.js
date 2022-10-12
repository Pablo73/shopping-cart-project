require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');


describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função.',async() => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('Executa a função fetchProducts com o argumento computador e teste se fetch foi chamada.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se a função fetch foi chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch.',async() => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })

  it('Testa se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.',async() => {
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })

});
