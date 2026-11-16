

function DeleteModal({title, text, onConfirm}) {
    return (
        <div className="modal fade modal-danger poppins" id="DeleteModal" tabindex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 text-white" id="exampleModalLabel">{title}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {text}
                    </div>
                    <div className="modal-footer">
                        <p>Ova je akcija nepovratna.</p>
                        <button type="button" onClick={onConfirm} className="button-danger button fw-bold px-4">Potvrdi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;