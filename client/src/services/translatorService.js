import {HfInference} from '@huggingface/inference'

const hf = new HfInference(process.env.VITE_API_KEY)

export const languages = Object.freeze(
    {
        es: {
            name: "Spanish",
            value: "spa_Latn"
        },
        en: {
            name: "English",
            value: "eng_Latn"
        },
        fr: {
            name: "French",
            value: "fra_Latn"
        },
    }
)

export const translateText = async ({textToTranslate, sourceLanguage, targetLanguage}) => {
    return await hf.translation({
        model: "facebook/nllb-200-distilled-600M",
        inputs: textToTranslate,
        parameters: {
            src_lang: languages[sourceLanguage].value,
            tgt_lang: languages[targetLanguage].value
        }
    })
}
