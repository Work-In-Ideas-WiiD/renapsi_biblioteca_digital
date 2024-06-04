import { Header } from "../../../components/Header";
import { InputSeach } from "../../../components/form/InputSearch";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divisor } from "../../../components/Divisor";
import { FileCard } from "../../../components/FileCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const formSchema = zod.object({
    search: zod.string(),

});

type TFormSchema = zod.infer<typeof formSchema>;

export function SearchPage() {
    let [searchParams] = useSearchParams();

    const { handleSubmit, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })

    useEffect(() => {
        console.log(searchParams.get("p"));

    }, [])

    async function onFormSubmit(params: TFormSchema) {
        console.log(params);

    }

    function onErase() {
        reset({
            search: ""
        })
    }

    return (
        <div className={styles.main}>
            <Header showBackButton={true} backButtonRoute="/app/home" />
            <section className={styles.search_section}>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <InputSeach
                        id="search"
                        fieldName="search"
                        control={control}
                        onErase={onErase}
                        placeholder="Pesquise pelo título ou palavra chave"
                    />
                </form>
            </section>
            <Divisor />
            <section className={styles.files_wraper}>
                <div className={styles.files_list}>
                    <FileCard />
                    <FileCard />
                    <FileCard />
                </div>
            </section>
        </div>
    )
}