const Loader = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="loader" role="status">
    {label}
  </div>
);

export default Loader;
