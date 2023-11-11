import React from 'react';
import PageLayout from "../../layout/PageLayout.jsx";
import FormSetting from "./FormSetting.jsx";

const SettingPage = () => {
    return (
        <PageLayout title={"Settings"}>
            <FormSetting/>
        </PageLayout>
    );
};

export default SettingPage;