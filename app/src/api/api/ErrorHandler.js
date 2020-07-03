import {ERROR_CODE} from './ErrorCode';
import DialogUtil from '../../utils/DialogUtil';

export const showError = (error) => {
  if (error && error.code) {
    let message = getMessage(error);
    DialogUtil.showMessageDialog('', message, 'OK');
  }
};

const getMessage = (error) => {
  switch (error.code) {
    case ERROR_CODE.ERROR_1:
      return 'Error 1';
    case ERROR_CODE.ERROR_2:
      return 'Error 2';
  }
  return 'Error';
};
