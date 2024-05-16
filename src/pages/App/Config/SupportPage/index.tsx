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

const formSchema = zod.object({
    email: zod.string().email({ message: "E-mail inválido" }),
    message: zod.string(),

});

type TFormSchema = zod.infer<typeof formSchema>;


export function SupportPage() {
    const { handleSubmit, control, formState: { errors } } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            message: ''
        }
    })

    async function onFormSubmit(params: TFormSchema) {

    }
    return (
        <div className={styles.main}>
            <Header alternativeLogo showMenuButton={false} showBackButton={true} backButtonRoute="/app/config" />
            <p className={styles.label}>Entre em contato <br />com nosso <strong>suporte</strong></p>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <InputText containerClass={styles.mb_20} fieldName="email" errors={errors} control={control} placeholder="E-mail" type="email" />
                <InputTextArea rows={8} fieldName="message" errors={errors} control={control} placeholder="Mensagem" />
                <div className={styles.submit_btn_container} >
                    <CustomButton title="Enviar" type="submit" />
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