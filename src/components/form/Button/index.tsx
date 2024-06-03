import { RotatingLines } from 'react-loader-spinner';
import styles from './styles.module.scss';


interface ICustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    variation?: "blue" | "transparent";
    loading: boolean
}


export function CustomButton({ title, variation = "blue", loading = false, ...rest }: ICustomButtonProps) {

    function getStyleClass(variation: string) {
        switch (variation) {
            case "blue":
                return styles.button_variation_1;
            case "transparent":
                return styles.button_variation_2;
            default:
                return styles.button_variation_1;
        }
    }

    function _renderContent(title: string, loading: boolean) {
        if (loading) {
            return (
                <RotatingLines
                    strokeColor="#fff"
                    strokeWidth="5"
                    animationDuration="1.00"
                    width="24"
                    visible={true}
                />
            )
        }
        return title;
    }

    return (
        <button
            className={`${getStyleClass(variation)} ${styles.button}`}
            {...rest}
        >
            {_renderContent(title, loading)}
        </button>
    )
}