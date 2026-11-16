

function PageTitle({title, text}) {

    return (
        <div className="welcome-text">
            <div className="text-center">
                <h1 className="fw-bold syncopate">{title}</h1>
                <hr className="divider" />
                <p className="poppins">
                    {text ? text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in suscipit quam. Nulla et sem vitae enim convallis volutpat. Etiam dapibus risus et bibendum tincidunt."}
                </p>
            </div>
        </div>
    )

}

export default PageTitle