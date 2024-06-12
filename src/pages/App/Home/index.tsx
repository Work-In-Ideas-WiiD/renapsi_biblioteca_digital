import { Header } from "../../../components/Header";
import { InputSeach } from "../../../components/form/InputSearch";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divisor } from "../../../components/Divisor";
import { Link, useNavigate } from "react-router-dom";

import { Tutorial } from "../../../components/Tutorial";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Module } from "../../../services/http/conteudos/module/types";
import { getModules } from "../../../services/http/conteudos/module";

const formSchema = zod.object({
    search: zod.string(),

});

type TFormSchema = zod.infer<typeof formSchema>;

export function Home() {
    const navigator = useNavigate();
    const [modules, setModules] = useState<Module[]>([]);
    const { handleSubmit, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    useEffect(() => {

        fetchModules();
    }, [])

    async function fetchModules() {
        try {
            const { data } = await getModules();
            setModules(data.data);
        } catch (error) {
            toast.error("Houve um erro ao carregar os modulos");
        }
    }

    async function onFormSubmit(params: TFormSchema) {
        if (params.search != "") {
            navigator(`/app/pesquisa?p=${params.search}`);
        }
    }

    function onErase() {
        reset({
            search: ""
        })
    }

    function returnTutorial() {
        const firstTime = localStorage.getItem("@RENAPSI_BIBLIOTECA_DIGITAL__TUTORIAL");

        if (!firstTime) {
            return (
                <Tutorial />
            )
        }

        return null;
    }

    function renderModuleList(_modules: Module[]) {
        if (_modules && _modules.length > 0) {

            return _modules.map((module) => (
                <Link key={module.id} className={styles.module_card} to={`/app/modulo/${module.id}`}>
                    <article>
                        <img src={module.icone} alt={module.nome} />
                    </article>
                </Link>
            ))
        }

        return null;
    }

    return (
        <div className={styles.main}>
            {returnTutorial()}
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
                        fetching={false}
                    />
                </form>
            </section>
            <Divisor text="Ou" />

            <section className={styles.modules_wraper}>
                <label className={styles.label_title}>Procure por <strong>módulo</strong></label>
                <div className={styles.module_list}>
                    {
                        renderModuleList(modules)
                    }
                </div>

            </section>
        </div>
    )
}