const union = (types) =>
  types.reduce(
    (prev, type) => ({
      ...prev,
      [type]: (data) => ({
        match: (fns) => fns[type](data),
      }),
    }),
    {}
  );

const someRandomFunction = () => {
  //123456789
};

export default union;
