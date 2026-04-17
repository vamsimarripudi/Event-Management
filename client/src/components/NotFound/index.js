import {
NotFoundContainer,
NotFoundTitle,
NotFoundMessage,
NotFoundImage,
BackButton

} from "./styledComponents";

const NotFound = () => {
    return (
        <NotFoundContainer>
            <NotFoundImage src="https://assets.ccbp.in/frontend/react-js/not-found-img.png" alt="not found" />
            <NotFoundTitle>404 - Not Found</NotFoundTitle>
            <NotFoundMessage>The page you are looking for does not exist.</NotFoundMessage>
            <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
        </NotFoundContainer>
    )
}

export default NotFound;