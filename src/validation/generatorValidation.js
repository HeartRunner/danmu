import {createValidator, required, url} from './validation';

export default createValidator({
    url: [required, url]
});
