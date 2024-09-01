const LoadingSpinner = () => {
  return (
    <div className="spinner-border text-warning" style={{borderWidth: "10px", width: "150px", height: "150px", marginTop: "20px"}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
export default LoadingSpinner;
