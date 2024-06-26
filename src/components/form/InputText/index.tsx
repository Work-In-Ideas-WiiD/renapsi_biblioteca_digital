import { Control, Controller, FieldErrors } from "react-hook-form";
import styles from "./styles.module.scss";
import { ErrorMessage } from "@hookform/error-message";

const styleClasses = {
    form: styles.form_input,
    login: styles.login_input
}

export interface InputText extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string,
    fieldName: string,
    containerClass?: string,
    control: Control<any>,
    errors: FieldErrors,
    variant?: "login" | "form"
}

export function InputText({
    type = "text",
    containerClass = "",
    fieldName,
    control,
    errors,
    variant = "form",
    ...rest
}: InputText) {

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_wrapper} ${containerClass}`}>
                        <input
                            className={styleClasses[variant]}
                            onChange={field.onChange}
                            value={field.value}
                            type={type}
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