import styles from './styles.module.scss';
import IconSeach from '../../../assets/svgs/icon_search_black.svg';
import IconRemoveText from '../../../assets/svgs/icon_remove_black.svg';
import { Control, Controller, FieldErrors } from 'react-hook-form';

export interface InputSeachProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string,
    fieldName: string,
    containerClass?: string,
    control: Control<any>,
    onErase: () => void
}

export function InputSeach({ control, fieldName, type = "text", containerClass, onErase, ...rest }: InputSeachProps) {
    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_wraper} ${containerClass}`}>
                        <div className={styles.search_button_wraper}>
                            <button className={styles.search_button} type="submit">
                                <img src={IconSeach} alt="procurar" />
                            </button>
                        </div>
                        <input
                            onChange={field.onChange}
                            value={field.value}
                            type={type}
                            {...rest}
                        />
                        {
                            field.value && (
                                <button onClick={onErase} className={styles.erase_button} >
                                    <img className={styles.erase_text_icon} src={IconRemoveText} alt="Excluír texto" />
                                </button>
                            )
                        }

                    </div>
                )
            }}
        />

    )
}