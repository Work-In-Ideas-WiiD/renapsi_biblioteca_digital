import styles from "./styles.module.scss";
import RenapsiFooterImg from "../../assets/imgs/renapsi-footer-login.png";
import BackgroungImg from "../../assets/imgs/login-bg-img.jpg";
import Logo from "../../assets/imgs/nova_logo_renapsi.png";
import { InputText } from "../../components/form/InputText";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "../../components/form/Button";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const formSchema = zod.object({
    username: zod.string({
        required_error: "Campo obrigatório"
    }),
    password: zod.string({
        required_error: "Campo obrigatório"
    }),
});

type TFormSchema = zod.infer<typeof formSchema>;

export function Login() {
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const { handleSubmit, control, formState: { errors } } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: undefined,
            password: undefined,
        }
    })

    async function handleLogin(login_props: TFormSchema) {
        if (loading) return;
        try {
            setLoading(true);
            await signIn(login_props.username, login_props.password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Nome de usuário ou senha inválido.")
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.bg}>
                <img className={styles.bg_img} src={BackgroungImg} alt="" />
                <div className={styles.bg_desktop}></div>
                <div className={styles.bg_blur}></div>
            </div>
            <div className={styles.login_wrapper}>
                
                <form action="post" onSubmit={handleSubmit(handleLogin)}>
                <div className="center_button">
                    <img className={styles.logo} src={RenapsiFooterImg} alt="Biblioteca Digital" /> 
                </div>    
                
                    <InputText
                        variant="login"
                        containerClass={styles.mb_40}
                        fieldName="username"
                        control={control}
                        errors={errors}
                        placeholder="Nome de usuário"
                    >
                    </InputText>
                    <InputText
                        variant="login"
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
                        <CustomButton type="submit" title="Entrar" loading={loading}></CustomButton>
                    </div>
                </form>
            </div>
            {/* <footer>
                <img className={styles.logo} src={RenapsiFooterImg} alt="demà jovem by renapsi" />
            </footer> */}
        </main>
    )
}