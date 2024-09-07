
import { useParams, useLocation } from 'react-router-dom';

const ErrorPage = () => {

    const { statusCode } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const errorMessage = queryParams.get('message');

    console.log("Error Page: statusCode = " + statusCode);
    console.log("Error Page: errorMessage = " + errorMessage);

    return (
        <>
            <div>"Unknown error Occured"</div>
            <p>Status Code: {statusCode}</p>
            <p>Error Message: {errorMessage}</p>
        </>
    )
}
export default ErrorPage;