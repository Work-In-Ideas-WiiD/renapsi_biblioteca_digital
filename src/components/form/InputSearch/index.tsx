import styles from './styles.module.scss';
import IconSeach from '../../../assets/svgs/icon_search_black.svg';
import IconRemoveText from '../../../assets/svgs/icon_remove_black.svg';
import { Control, Controller } from 'react-hook-form';
import { TailSpin, } from 'react-loader-spinner';

export interface InputSeachProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string,
    fieldName: string,
    containerClass?: string,
    control: Control<any>,
    fetching: boolean,
    onErase: () => void
}

export function InputSeach({ control, fieldName, type = "text", fetching, containerClass, onErase, ...rest }: InputSeachProps) {
    function isFetching(fetching: boolean) {
        if (fetching) {
            return (
                <TailSpin
                    visible={true}
                    strokeWidth={5}
                    height="25"
                    width="25"
                    color="#8C8C8C"
                    ariaLabel="tail-spin-loading"
                    radius={1}
                />
            );
        }
        return (
            <button className={styles.search_button} type="submit">
                <img src={IconSeach} alt="procurar" />
            </button>
        );
    }

    return (
        <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
                return (
                    <div className={`${styles.input_wraper} ${containerClass}`}>
                        <div className={styles.search_button_wraper}>
                            {isFetching(fetching)}
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