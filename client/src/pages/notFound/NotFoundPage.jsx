import React from 'react';
import PageLayout from "../../layout/PageLayout.jsx";

const NotFoundPage = () => {
    return (
        <PageLayout title={"Page not found"}>
            <div style={{textAlign: "center"}}>
                <h1>
                    NOT FOUND
                </h1>
            </div>

        </PageLayout>
    );
};

export default NotFoundPage;