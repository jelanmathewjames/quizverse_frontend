import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">  Page not found</h1>
          <p className="py-6">
          Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
          </p>
          <button className="btn btn-outline btn-active" onClick={goBack}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
