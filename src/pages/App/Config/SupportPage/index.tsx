import { Header } from "../../../../components/Header";
import { InputText } from "../../../../components/form/InputText";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputTextArea } from "../../../../components/form/InputTextArea";
import { CustomButton } from "../../../../components/form/Button";
import { Divisor } from "../../../../components/Divisor";
import InstagramIcon from "../../../../assets/svgs/icon_instagram.svg"
import WebsiteIcon from "../../../../assets/svgs/icon_www.svg"
import LinkedinIcon from "../../../../assets/svgs/icon_linkedin.svg"
import { useState } from "react";
import { toast } from "react-toastify";
import { postSuporte } from "../../../../services/http/users/suporte";
import ReCAPTCHA from "react-google-recaptcha";

const formSchema = zod.object({
    email: zod.string({
        required_error: "Campo obrigatório"
    }).email({ message: "E-mail inválido" }),
    message: zod.string(),

});

type TFormSchema = zod.infer<typeof formSchema>;


export function SupportPage() {
    const [loading, setLoading] = useState(false);
    const [capVal, setCapVal] = useState<string | null>(null);
    const { handleSubmit, control, formState: { errors }, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: undefined,
            message: undefined
        }
    })

    async function onFormSubmit(params: TFormSchema) {
        if (loading) return
        try {
            setLoading(true);
            await postSuporte(params.email, params.message);
            toast.success("Mensagem enviada ao suporte!");
            resetForm();
        } catch (error) {
            toast.error("Erro ao enviar mensagem de suporte");
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        reset({
            email: "",
            message: ""
        })
    }

    return (
        <div className={styles.main}>
            <Header alternativeLogo showMenuButton={false} showBackButton={true} backButtonRoute="/app/config" />
            <p className={styles.label}>Entre em contato <br />com nosso <strong>suporte</strong></p>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <InputText containerClass={styles.mb_20} fieldName="email" errors={errors} control={control} placeholder="E-mail" type="email" />
                <InputTextArea rows={8} fieldName="message" errors={errors} control={control} placeholder="Mensagem" />
                <div className={styles.recapcha_container}>
                    <ReCAPTCHA
                        sitekey="6LdlV5sUAAAAACePBaldFo2RK3Lsfwzy3R-fPOzD"
                        onChange={(val) => { setCapVal(val) }}
                    />
                </div>

                <div className={styles.submit_btn_container} >
                    <CustomButton disabled={!capVal} title="Enviar" type="submit" loading={loading} />
                </div>
            </form>
            <Divisor />
            <div className={styles.icons_container}>
                <a href="#">
                    <img src={InstagramIcon} alt="Instagram" />
                </a>
                <a href="#">
                    <img src={WebsiteIcon} alt="Site" />
                </a>
                <a href="#">
                    <img src={LinkedinIcon} alt="Linkedin" />
                </a>
            </div>
        </div >
    )
}