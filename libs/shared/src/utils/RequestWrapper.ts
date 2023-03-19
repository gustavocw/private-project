interface Props {
  request: Function,
  onCatch: Function,
  onFinally?: Function,
}

export const withRequestWrapper = async (props: Props) => {
  try {
    await props.request();
  }
  catch (e) {
    props?.onCatch(e);
  }
  finally {
    props.onFinally ? props.onFinally() : null;
  }
};
