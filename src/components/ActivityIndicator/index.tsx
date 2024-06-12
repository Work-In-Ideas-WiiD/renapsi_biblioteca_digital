import { TailSpin } from 'react-loader-spinner';
import styles from './styles.module.scss';

export function ActivityIndicator() {
    return (
        <div className={styles.container}>
            <TailSpin
                visible={true}
                strokeWidth={5}
                height="50"
                width="50"
                color="#8C8C8C"
                ariaLabel="tail-spin-loading"
                radius={1}
            />
        </div>
    )
}