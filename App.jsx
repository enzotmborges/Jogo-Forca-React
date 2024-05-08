import React, { useEffect, useState } from "react";
import App from './App.css';

const palavras = [
  "gato",
  "cachorro",
  "elefante",
  "macaco",
  "gorila",
  "girafa",
  "papagaio",
  "urubu",
  "pica-pau",
  "tartaruga",
  "topeira"
];

function Forca() {
  const [palavra, setPalavra] = useState("");
  const [letrasSelecionadas, setLetrasSelecionadas] = useState([]);
  const [tentativasErradas, setTentativasErradas] = useState(0);
  const [vitoria, setVitoria] = useState(false); // Novo estado para controlar a vitória

  function escolherPalavra() {
    return palavras[Math.floor(Math.random() * palavras.length)];
  }

  useEffect(() => {
    setPalavra(escolherPalavra());
    setLetrasSelecionadas([]);
    setTentativasErradas(0);
    setVitoria(false); // Reiniciar o estado de vitória
  }, []);

  function handleLetraClick(letra) {
    if (!letrasSelecionadas.includes(letra)) {
      const novaLista = [...letrasSelecionadas, letra];
      setLetrasSelecionadas(novaLista);
      if (!palavra.includes(letra)) {
        setTentativasErradas(tentativasErradas + 1);
      }
    }

    // Verificar se todas as letras da palavra foram adivinhadas
    if (palavra.split("").every((letra) => letrasSelecionadas.includes(letra))) {
      setVitoria(true); // Definir o estado de vitória como verdadeiro
    }
  }

  function palavraOculta() {
    return palavra
      .split("")
      .map((letra) => (letrasSelecionadas.includes(letra) ? letra : "_"))
      .join(" ");
  }

  return (
    <div>
      <h1>Jogo da Forca</h1>
      <p>Palavra: {palavraOculta()}</p>
      <p>Tentativas erradas: {tentativasErradas}</p>
      {vitoria ? ( // Exibir mensagem de vitória se vitoria for verdadeiro
        <p style={{ color: "green" }}>Você venceu! Parabéns!</p>
      ) : (
        <div className="letras">
          {Array.from("abcdefghijklmnopqrstuvwxyz").map((letra) => (
            <button
              key={letra}
              onClick={() => handleLetraClick(letra)}
              disabled={letrasSelecionadas.includes(letra)}
            >
              {letra}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forca;