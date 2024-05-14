import { Header } from "../../../components/Header";
import { InputSeach } from "../../../components/form/InputSearch";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
                <label className={styles.label_search_for} htmlFor="">Pesquise por <strong>título</strong></label>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <InputSeach
                        fieldName="search"
                        control={control}
                        onErase={onErase}
                        placeholder="Pesquise pelo título ou palavra chave"
                    />
                </form>
            </section>
        </div>
    )
}