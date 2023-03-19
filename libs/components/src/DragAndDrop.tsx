import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {observer} from 'mobx-react';
import useEffectOnce from '@alkord/shared/hooks/UseEffectOnce';
import _uniqueId from 'lodash/uniqueId';

interface Props {
  extensoesValidas?: string[];
  onSelecionarArquivo: (arquivo: File) => void;
  textoDrag? : string
}

const DragAndDrop = (props: React.PropsWithChildren<Props>) => {
  const {
    extensoesValidas,
    onSelecionarArquivo,
    textoDrag,
  } = props;

  const classes = styles();
  const dropRef: any = React.createRef();
  const [inputID] = useState(_uniqueId());

  const [hasArquivoCarregado, setHasArquivoCarregado] = useState(false);
  const [nomeArquivoCarregado, setNomeArquivoCarregado] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validarArquivo(e.dataTransfer.files[0]);
    }
  };

  const isExtensaoValida = (extensao: string) => {
    for (const extensaoValida of extensoesValidas) {
      if (extensao.toUpperCase() === extensaoValida.toUpperCase()) {
        return true;
      }
    }

    return false;
  };

  const validarArquivo = (file: File) => {
    try {
      const extensao = file.name.split('.').pop();

      if (isExtensaoValida(extensao)) {
        onSelecionarArquivo(file);
        setHasArquivoCarregado(true);
        setNomeArquivoCarregado(file.name);
      }
      else {
        onSelecionarArquivo(null);
      }
    }
    catch (e) {
      onSelecionarArquivo(null);
    }
  };

  const onChangeInputArquivo = (event: any) => {
    return validarArquivo(event.target.files[0]);
  };

  const resetarInput = (event: any) => {
    event.target.value = '';
  };

  useEffectOnce(() => {
    const div: any = dropRef.current;
    div.addEventListener('dragenter', onDragEnter);
    div.addEventListener('dragleave', onDragLeave);
    div.addEventListener('dragover', onDragOver);
    div.addEventListener('drop', onDrop);
  });

  return (
    <div className={`${classes.container} ${isDragging ? classes.containerDragging : classes.containerNotDragging}`}
      ref={dropRef}
    >
      {!hasArquivoCarregado &&
        <>
          <Typography className={`${classes.title} ${isDragging ? classes.titleDragging : classes.titleNotDragging}`}>
            {textoDrag ? textoDrag : 'Arraste um arquivo para este quadro'}
          </Typography>

          <Typography className={classes.description}>
            ou, se preferir...
          </Typography>
        </>
      }

      {hasArquivoCarregado &&
        <Typography className={classes.description}>
          Arquivo "{nomeArquivoCarregado}" carregado com sucesso.
        </Typography>
      }

      <Button variant="contained" color="primary"
        onClick={() => document.getElementById(inputID).click()}
      >
        {hasArquivoCarregado ? 'SELECIONE OUTRO ARQUIVO' : 'SELECIONE UM ARQUIVO DO SEU COMPUTADOR'}

        <input
          onClick={resetarInput}
          onChange={onChangeInputArquivo}
          accept={extensoesValidas.map((extensao) => '.' + extensao).join(',')}
          id={inputID}
          type="file"
          hidden
        />
      </Button>
    </div>
  );
};

const styles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    height: 180,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 8,
    marginTop: 20,
  },
  containerDragging: {
    border: '3px dashed #2196f3',
    '& > *': {
      pointerEvents: 'none',
    },
  },
  containerNotDragging: {
    border: '2px dashed #2196f3',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  titleNotDragging: {
    color: 'grey',
  },
  titleDragging: {
    color: '#2196f3',
  },
  description: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
  },
}));

export default observer(DragAndDrop);
