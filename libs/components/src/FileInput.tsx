import React, {useState} from 'react';
import _uniqueId from 'lodash/uniqueId';
import {observer} from 'mobx-react';

interface FileInputProps {
  onSelecionarArquivo: (file: File) => void;
  onErro: (erro: string) => void;
  extensoesValidas: string[];
  componente: (onClick: () => void) => React.ReactNode;
}

const FileInput = (props: FileInputProps) => {
  const {
    componente,
    extensoesValidas,
    onSelecionarArquivo,
    onErro,
  } = props;

  const [inputID] = useState(_uniqueId());

  const isExtensaoValida = (extensao: string) => {
    return extensoesValidas
        .map((extensaoValida) => extensaoValida.toUpperCase())
        .includes(extensao.toUpperCase());
  };

  const validarArquivo = (arquivo: File) => {
    try {
      const extensao = arquivo.name.split('.').pop();
      if (isExtensaoValida(extensao)) {
        onSelecionarArquivo(arquivo);
      }
      else {
        onErro('Extensão do arquivo inválida.\nTipos suportados: ' + extensoesValidas.join(', '));
      }
    }
    catch (e) {
      onErro('Ocorreu um erro ao selecionar o arquivo');
    }
  };

  const resetarInput = (event: any) => {
    event.target.value = '';
  };

  return (
    <>
      {componente(() => document.getElementById(inputID).click())}
      <input
        onClick={resetarInput}
        onChange={(e) => validarArquivo(e.target.files[0])}
        accept={extensoesValidas.map((extensao) => '.' + extensao).join(',')}
        multiple={false}
        id={inputID}
        type="file"
        hidden
      />
    </>
  );
};

export default observer(FileInput);
