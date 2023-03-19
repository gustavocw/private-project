import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import {ptBR} from '@material-ui/core/locale';

export const
  theme = createMuiTheme({
    palette: {
      primary: {
        '50': '#e3f2fd',
        '100': '#bbdefb',
        '200': '#90caf9',
        '300': '#64b5f6',
        '400': '#42a5f5',
        '500': '#2196f3',
        '600': '#1e88e5',
        '700': '#1976d2',
        '800': '#1565c0',
        '900': '#0d47a1',
        'A100': '#82b1ff',
        'A200': '#448aff',
        'A400': '#2979ff',
        'A700': '#2962ff',
        'main': '#1E96F3',
      },
      secondary: {
        'main': '#707070',
      },
    },
    overrides: {
      MuiCardContent: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },
      MuiFormHelperText: {
        root: {
          marginTop: '-3px',
          color: '#00000052',
          fontSize: '11px',
          overflow: 'hidden',
          display: 'block',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      MuiButton: {
        containedSecondary: {
          backgroundColor: '#ffffff !important',
          color: '#1E96F3 !important',
          '&:hover': {
            backgroundColor: '#f1f1f1 !important',
          },
        },
        outlined: {
          backgroundColor: '#ffffff !important',
          '&:hover': {
            backgroundColor: '#f1f1f1 !important',
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: 10,
        },
      },
      MuiTypography: {
        caption: {
          fontSize: '1rem',
          letterSpacing: null,
          lineHeight: 1.5,
          fontWeight: 'bold',
        },
        colorTextPrimary: {
          color: '#2962ff',
        },
        overline: {
          fontSize: 12,
          letterSpacing: null,
          lineHeight: 1,
          textTransform: null,
        },
      },
      MuiGrid: {
        item: {
          '&:empty': {
            flexBasis: 0,
            width: 0,
            height: 0,
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiFormControlLabel: {
        labelPlacementStart: {
          justifyContent: 'space-between',
        },
      },
      MuiDialogTitle: {
        root: {
          padding: 16,
        },
      },
      MuiDialogContent: {
        root: {
          padding: '0px 16px',
        },
      },
      MuiDialogActions: {
        root: {
          padding: '8px 16px 16px 16px ',
        },
      },
    },
  }, ptBR);

export const cardStyles = makeStyles({
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    padding: '0px 20px',
  },
  cardHeaderContent: {
    display: 'flex',
  },
  cardHeaderActions: {
    marginLeft: 'auto',
  },
  cardContent: {
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  container: {
    width: '100%',
  },
}, {name: 'CardStyles'});
