import formTheme from "../themes/formTheme";
const ErrorPage = (props) => {
    const { Perror, Ltag } = formTheme;
    return (
        <div>
            {(() => {
                switch (props.status) {
                    case 500: return <Perror className="display-1 m-4 text-danger" data-text="Internal Server Error">Internal Server Error</Perror>
                    case 404: return <Perror className="display-1 m-4 text-danger" data-text="Page Not Found">Page Not Found</Perror>
                }
            })()}
            <div><Ltag to="/">Go to home page</Ltag></div>
        </div>

    );
}

export default ErrorPage;