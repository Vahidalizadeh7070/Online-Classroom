import React, { Fragment } from "react";
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/bootstrap-react';

const Toasts = (props) => {
    return (
        <Fragment>
            <CToaster placement='bottom-end'>
                <CToast autohide={true} onClose={props.onClose} delay={3000} visible={props.show} color="primary" className="text-white rounded-3 shadow">
                    <div className="d-flex">
                        <CToastBody>{props.message}</CToastBody>
                        <CToastClose className="me-2 m-auto" />
                    </div>
                </CToast>
            </CToaster>
        </Fragment>
    );
};

export default Toasts;