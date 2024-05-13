import styles from "./styles.module.scss";
import RenapsiFooterImg from "../../assets/imgs/renapsi-footer-login.png";
import BackgroungImg from "../../assets/imgs/login-bg.png";
import Logo from "../../assets/svgs/login_logo.svg";
import { InputText } from "../../components/form/InputText";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "../../components/form/Button";

const formSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function Login() {

    const { handleSubmit, control, formState: { errors } } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        }
    })

    return (
        <main className={styles.main}>
            <div className={styles.bg}>
                <img className={styles.bg_img} src={BackgroungImg} alt="Biblioteca Digital" />
                <div className={styles.bg_blur}></div>
            </div>
            <div className={styles.login_wrapper}>
                <img className={styles.logo} src={Logo} alt="Biblioteca Digital" />
                <form action="post" onSubmit={() => { }}>
                    <InputText
                        containerClass={styles.mb_40}
                        fieldName="username"
                        control={control}
                        errors={errors}
                        placeholder="Nome de usuário"
                    >
                    </InputText>
                    <InputText
                        containerClass={styles.mb_26}
                        type="password"
                        fieldName="password"
                        control={control}
                        errors={errors}
                        placeholder="Senha"
                    >
                    </InputText>
                    <a href="#" className={styles.forgot_password}>Esqueci a minha senha.</a>
                    <div className="center_button">
                        <CustomButton type="submit" title="Entrar"></CustomButton>
                    </div>
                </form>
            </div>
            <footer>
                <img className={styles.logo} src={RenapsiFooterImg} alt="demà jovem by renapsi" />
            </footer>
        </main>
    )
}