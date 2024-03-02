import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Access Denied</h1>
          <p className="py-6">
            It looks like you don't have permission to view this page. Please
            check your account status or contact support for assistance.
          </p>
          <button className="btn btn-outline btn-active" onClick={goBack}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
