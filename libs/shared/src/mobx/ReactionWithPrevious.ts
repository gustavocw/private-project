import {IReactionDisposer, isObservable, reaction} from 'mobx';
import {isEqual} from 'lodash';
import Utils from '../utils/Utils';

const reactionWithPrevious = <T>(
  expression: () => T,
  effect: (newValue: T, oldValue?: T) => void,
) => {
  let oldValue: T = expression();

  const disposer = reaction(expression, (value) => {
    if (!isEqual(value, oldValue)) {
      effect(value, oldValue);
      oldValue = isObservable(value) ? Utils.deepClone(value) : value;
    }
  });

  return (() => {
    oldValue = null;
    disposer();
  }) as IReactionDisposer;
};

export default reactionWithPrevious;
