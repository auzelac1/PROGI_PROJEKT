

function PageTitle({title, text}) {

    return (
        <div className="welcome-text">
            <div className="text-center">
                <h1 className="fw-bold syncopate">{title}</h1>
                <hr className="divider" />
                <p className="poppins">
                    {text ? text : "Pregled profila i osobnih podataka."}
                </p>
            </div>
        </div>
    )

}

export default PageTitle