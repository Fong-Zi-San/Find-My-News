import CustomButton from "../custom/CustomButton";

function PageNotFound() {
  return (
    <div style={{marginLeft: "15px"}}>
      <h1>Error 404 - Page Not Found</h1>
      <p>This page does not exist.</p>
      <CustomButton variant="contained" href="/home">
        Back to homepage
      </CustomButton>
    </div>
  );
}

export default PageNotFound;
