import { Control, Controller, FieldErrors } from "react-hook-form";
import styles from "./styles.module.scss";
import { ErrorMessage } from "@hookform/error-message";


export interface InputText extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    fieldName: string,
    containerClass?: string,
    control: Control<any>,
    errors: FieldErrors,
}

export function InputTextArea({
    containerClass = "",
    fieldName,
    control,
    errors,
    ...rest
}: InputText) {

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_wrapper} ${containerClass}`}>
                        <textarea
                            onChange={field.onChange}
                            value={field.value}
                            {...rest}
                        />
                        <ErrorMessage
                            errors={errors}
                            name={fieldName}
                            render={({ message }) => {
                                return (
                                    <span className={styles.error_msg}>{message}</span>
                                )
                            }}

                        />
                    </div>
                )
            }}
        />

    )
}