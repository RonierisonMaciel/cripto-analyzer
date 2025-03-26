import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [precos, setPrecos] = useState({
    btc: 0,
    eth: 0,
    xrp: 0
  });
  const [carregando, setCarregando] = useState(true);

  // Função para buscar preços em tempo real
  const fetchPrecos = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple&vs_currencies=usd'
      );
      setPrecos({
        btc: response.data.bitcoin.usd,
        eth: response.data.ethereum.usd,
        xrp: response.data.ripple.usd
      });
      setCarregando(false);
    } catch (error) {
      console.error('Erro ao buscar preços:', error);
      setCarregando(false);
    }
  };

  // Atualiza os preços a cada 10 segundos
  useEffect(() => {
    fetchPrecos(); // Busca inicial
    const intervalo = setInterval(fetchPrecos, 10000); // Atualiza a cada 10 segundos

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="App">
      <h1>Preços de Criptomoedas em Tempo Real</h1>
      {carregando ? (
        <p>Carregando preços...</p>
      ) : (
        <div className="precos-container">
          <div className="moeda-card">
            <h2>Bitcoin (BTC)</h2>
            <p>USD {precos.btc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="moeda-card">
            <h2>Ethereum (ETH)</h2>
            <p>USD {precos.eth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="moeda-card">
            <h2>Ripple (XRP)</h2>
            <p>USD {precos.xrp.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      )}
      <p className="atualizacao">Atualiza a cada 10 segundos</p>
    </div>
  );
}

export default App;
