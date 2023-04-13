const useAsyncEffect = (fn, dep) => {
  useEffect(() => {
    fn();
  }, dep);
};

export default useAsyncEffect;
