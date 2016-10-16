import memoize from 'lru-memoize';
import { createValidator, required } from 'utils/validation';

const newPostValidation = createValidator({
  title: required,
  body: required
});
export default memoize(10)(newPostValidation);
