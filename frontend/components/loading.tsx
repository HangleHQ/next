

export default function Loading() {
    return (
        <>
            <div className="loading_image">
                <div className="center">
                    <br />
                    <br />
                    <br />
                    <br />
                    <img alt="hangle loading..." src={window.CONFIG.LOADING_IMAGE} />
                    <h1>Connecting to Hangle...</h1>
                    <p>
                        We're loading your conversations, please wait. Having problems?
                        Take a look at the{" "}
                        <a href="https://hangle.me/docs/troubleshooting/connecting">
                        troubleshooting guide
                </a>
                .
              </p>
                </div>
            </div>
        </>
    );
}