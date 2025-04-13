export const salvarCidadeFavorita = (cidade: string) => {
    const cidadesFavoritas = JSON.parse(localStorage.getItem('cidadesFavoritas') || '[]');
    if (!cidadesFavoritas.includes(cidade)) {
      cidadesFavoritas.push(cidade);
      localStorage.setItem('cidadesFavoritas', JSON.stringify(cidadesFavoritas));
    }
  };
  
  export const obterCidadesFavoritas = (): string[] => {
    return JSON.parse(localStorage.getItem('cidadesFavoritas') || '[]');
  };
  