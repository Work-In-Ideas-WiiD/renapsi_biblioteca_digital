import { Header } from "../../../components/Header";
import { InputSeach } from "../../../components/form/InputSearch";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divisor } from "../../../components/Divisor";
import { FileCard } from "../../../components/FileCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Module } from "../../../services/http/conteudos/module/types";

const formSchema = zod.object({
    search: zod.string(),

});

type TFormSchema = zod.infer<typeof formSchema>;

export function SearchPage() {
    const params = useParams();


    const { handleSubmit, control, reset } = useForm<TFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: '',
        }
    })



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
                    {/* <FileCard />
                 */}
                </div>
            </section>
        </div>
    )
}