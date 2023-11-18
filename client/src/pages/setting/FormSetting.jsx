import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import {languages} from "../../services/translatorService.js";
import {usePreference} from "../../hooks/usePreference.js";
import Alert from '@mui/material/Alert';
import toast, { Toaster } from 'react-hot-toast';

const FormSetting = () => {
    const [textInputLanguage, setTextInputLanguage] = useState('');
    const [textInputLanguageForSending, setTextInputLanguageForSending] = useState('');
    const {languagePreference, setLanguagePreference} = usePreference();

    useEffect(() => {
        if (languagePreference) {
            setTextInputLanguage(languagePreference.textInputLanguage);
            setTextInputLanguageForSending(languagePreference.textInputLanguageForSending);
        }

    }, []);

    const handleTextInputLanguage = (event) => {
        setTextInputLanguage(event.target.value);
    }

    const handleTextInputLanguageForSending = (event) => {
        setTextInputLanguageForSending(event.target.value);
    }

    const handleSavePreferences = () => {
        setLanguagePreference({
            textInputLanguage,
            textInputLanguageForSending
        });
        toast.success('Changes saved!');
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{border: '1px solid gray', height: '75dvh', mt: "1rem", p: "1rem"}}>
                {!languagePreference && (
                    <Alert severity="warning">In order to use the chat you must first set your language
                        preferences!</Alert>)}
                <FormControl fullWidth margin={"normal"}>
                    <InputLabel id="source-input-language">Source input</InputLabel>
                    <Select
                        labelId="source-input-language"
                        id="source-input-language"
                        value={textInputLanguage}
                        onChange={handleTextInputLanguage}
                        label={"Source input"}
                        required={true}
                    >
                        {
                            Object.entries(languages)?.map(language => (
                                <MenuItem key={language[0]} value={language[0]}>{language[1].name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Text input language</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin={"normal"}>
                    <InputLabel id="source-language">For sending</InputLabel>
                    <Select
                        labelId="receiving-language"
                        id="receiving-language"
                        value={textInputLanguageForSending}
                        onChange={handleTextInputLanguageForSending}
                        label={"For sending"}
                        required={true}
                    >
                        {
                            Object.entries(languages)?.map(language => (
                                <MenuItem key={language[0]} value={language[0]}>{language[1].name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Text input language for sending</FormHelperText>
                </FormControl>
                <FormControl fullWidth margin={"normal"}>
                    <Button variant="outlined" startIcon={<SaveIcon/>} onClick={handleSavePreferences}>
                        Save
                    </Button>
                </FormControl>
            </Box>
            <Toaster position={"top-right"} />
        </Container>
    );
};

export default FormSetting;