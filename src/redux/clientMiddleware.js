export default function clientMiddleware(client) {
  return ({/* dispatch, getState */}) => {
    return (next) => (action) => {
      const { promise, types, onSuccess, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(client).then(
        (result) => {
          next({...rest, result, type: SUCCESS})
          if(onSuccess){
            onSuccess(result);
          }
        },
        (error) => next({...rest, error, type: FAILURE})
      );
    };
  };
}
