import { Header } from "../../../components/Header";
import { InputSeach } from "../../../components/form/InputSearch";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divisor } from "../../../components/Divisor";
import { Link } from "react-router-dom";

import ImgBgModuleTest from '../../../assets/imgs/module_test.jpg';

const formSchema = zod.object({
    search: zod.string(),

});

type TFormSchema = zod.infer<typeof formSchema>;

export function Home() {
    const { handleSubmit, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    async function onFormSubmit(params: TFormSchema) {

    }

    function onErase() {
        reset({
            search: ""
        })
    }

    return (
        <div className={styles.main}>
            <Header showBackButton={false} />
            <section className={styles.search_section}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label className={styles.label_title} htmlFor="search">Pesquise por <strong>título</strong></label>
                    <InputSeach
                        id="search"
                        fieldName="search"
                        control={control}
                        onErase={onErase}
                        placeholder="Pesquise pelo título ou palavra chave"
                    />
                </form>
            </section>
            <Divisor text="Ou" />

            <section className={styles.modules_wraper}>
                <label className={styles.label_title}>Procure por <strong>módulo</strong></label>
                <div className={styles.module_list}>
                    <Link className={styles.module_card} to={"/app/modulo/1"}>
                        <article >
                            <img src={ImgBgModuleTest} alt="" />
                        </article>
                    </Link>
                    <Link className={styles.module_card} to={"/app/modulo/1"}>
                        <article >
                            <img src={ImgBgModuleTest} alt="" />
                        </article>
                    </Link>
                    <Link className={styles.module_card} to={"/app/modulo/1"}>
                        <article >
                            <img src={ImgBgModuleTest} alt="" />
                        </article>
                    </Link>
                </div>

            </section>
        </div>
    )
}