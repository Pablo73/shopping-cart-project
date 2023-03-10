require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função.',async() => {
    expect(typeof fetchItem).toBe('function');
  })

  it('Executa a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se, ao chamar a função fetchItem com o argumento do item MLB1615760527, a função fetch utiliza o endpoint', async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(url);
  });

it('Testa se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.',async() => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  })  

  it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.',async() => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
