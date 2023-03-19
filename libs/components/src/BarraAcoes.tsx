import React, {useEffect} from 'react';
import {Theme} from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {ComponentConfigHolder} from './helpers/ComponentsConfigProvider';
import useScrollEndHandler from '@alkord/shared/hooks/UseScrollEndHandler';

export const alturaBarraAcoes = 63;
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    width: `calc(100% - ${ComponentConfigHolder.get().drawerWidth}px)`, // TODO deferred
    position: 'fixed',
    display: 'flex',
    bottom: 0,
    right: 0,
    zIndex: 999,
    height: alturaBarraAcoes,
    // @ts-ignore
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    justifyContent: 'center',
    background: 'rgba(232,232,232,0.8)',
    backdropFilter: 'blur(2px)',
  },
  container: {
    display: 'flex',
    margin: '0 16px 0 16px',
    width: '100%',
    paddingLeft: 16,
  },
  content: {
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  scrollDownSign: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Roboto',
    color: '#2196f3',
    margin: '0 auto 0 auto',
  },
  scrollButton: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  icon: {
    transform: 'rotate(90deg)',
    fontSize: 20,
  },
}));

interface Props extends React.PropsWithChildren<any> {
  sempreVisivel?: boolean;
}

const BarraAcoes: React.FC<Props> = (props: Props) => {
  const {children, sempreVisivel} = props;
  const classes = useStyles();
  const {
    isScrollEnd: isScrolledToBottom,
    update: updateScrollHandler,
  } = useScrollEndHandler();

  const scrollToEnd = () => {
    window.scroll({top: document.body.scrollHeight, left: 0, behavior: 'smooth'});
    updateScrollHandler();
  };

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('scrolled_to_bottom'));
  }, [isScrolledToBottom]);

  const exibirConteudo = isScrolledToBottom || sempreVisivel;

  return (
    <div
      className={classes.wrapper}
      onClick={!exibirConteudo ? scrollToEnd : null}
      style={{cursor: !exibirConteudo ? 'pointer' : 'default'}}
    >
      <div className={classes.container}
        style={{
          maxWidth: (exibirConteudo ? 930 : 1004),
          paddingRight: (exibirConteudo ? 8 : 0),
        }}>
        <div className={classes.content}>
          {exibirConteudo ? (
            <>
              {children}
            </>
            ) : (
              <div className={classes.scrollDownSign}>
                <div className={classes.text}>
                  ROLE ATÉ O FINAL DA TELA
                </div>
                <div className={classes.scrollButton} onClick={scrollToEnd}>
                  <DoubleArrowIcon color="primary" className={classes.icon}/>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default BarraAcoes;
